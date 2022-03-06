import {
  PublicKey,
  ParsedTransactionWithMeta,
  Commitment,
  RpcResponseAndContext,
  SignatureResult,
  ParsedInstruction,
} from '@solana/web3.js';

import {
  Node,
  Result,
  Constants
} from '@solana-suite/shared';

import {ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID} from '@solana/spl-token';

export namespace Transaction {

  // type guard
  const isParsedInstructon = (arg: any): arg is ParsedInstruction => {
    return arg !== null && typeof arg === 'object' && arg.parsed;
  }

  const createTransferHistory = (
    instruction: ParsedInstruction,
    value: ParsedTransactionWithMeta,
    inOutFilter?: TransferFilter
  ) => {
    const v: TransferHistory = instruction.parsed;
    v.date = convertTimestmapToDate(value.blockTime as number);
    v.sig = value.transaction.signatures[0];
    v.innerInstruction = false;
    if (value.meta?.innerInstructions && value.meta?.innerInstructions.length !== 0) {
      // inner instructions
      v.innerInstruction = true;
    }

    if (inOutFilter) {
      if (inOutFilter && v.info[inOutFilter.filter] === inOutFilter.pubkey.toString()) {
        return v;
      }
    } else {
      return v;
    }
  }

  const createMemoHistory = (
    instruction: ParsedInstruction,
    value: ParsedTransactionWithMeta,
    inOutFilter?: TransferFilter
  ) => {
    const v: TransferHistory = {
      info: {},
      type: '',
      sig: '',
      date: new Date(),
      innerInstruction: false
    };
    v.memo = instruction.parsed;
    v.type = instruction.program;
    v.date = convertTimestmapToDate(value.blockTime as number);
    v.sig = value.transaction.signatures[0];
    v.innerInstruction = false;
    if (value.meta?.innerInstructions && value.meta?.innerInstructions.length !== 0) {
      // inner instructions
      v.innerInstruction = true;
    }
    if (inOutFilter) {
      if (v.info[inOutFilter.filter] === inOutFilter.pubkey.toString()) {
        return v;
      }
    } else {
      return v;
    }
  }

  const filterTransactions = (
    transactions: Result<ParsedTransactionWithMeta>[],
    filterOptions: Filter[],
    inOutFilter?: TransferFilter,
  ) => {
    const hist: TransferHistory[] = [];
    transactions.forEach(tx => {
      if (tx.isErr) return tx;
      tx.value.transaction.message.instructions.forEach(instruction => {
        if (isParsedInstructon(instruction)) {
          if (filterOptions.includes(instruction.parsed.type)) {
            const res = createTransferHistory(instruction, tx.value, inOutFilter);
            res && hist.push(res);
          } else {
            //spl-memo, other?
            if (filterOptions.includes(instruction.program as Filter)) {
              const res = createMemoHistory(instruction, tx.value, inOutFilter);
              res && hist.push(res);
            }
          }
        }
      });
    });
    return hist;
  }

  const convertTimestmapToDate = (blockTime: number): Date =>
    new Date(blockTime * 1000);

  export const subscribeAccount = (
    pubkey: PublicKey,
    callback: any
  ): number => {
    return Node.getConnection().onAccountChange(pubkey, async () => {
      const res = await getHistory(
        pubkey,
        {
          actionFilter: [
            Filter.Transfer,
            Filter.TransferChecked
          ]
        }
      );
      if (res.isErr) {
        return res;
      }
      callback((res.value as TransferHistory[])[0]);
    });
  }

  export const unsubscribeAccount = (subscribeId: number)
    : Promise<void> =>
    Node.getConnection().removeAccountChangeListener(subscribeId);

  export interface TransferHistory {
    info: {
      destination?: string,
      source?: string,
      authority?: string,
      multisigAuthority?: string,
      signers?: string[],
      amount?: string,
      mint?: string,
      tokenAmount?: any[],
    },
    type: string,
    date: Date,
    innerInstruction: boolean,
    sig: string,
    memo?: string,
  }

  export interface TransferDestinationList {
    dest: PublicKey,
    date: Date,
  }

  export enum Filter {
    Transfer = 'transfer',
    TransferChecked = 'transferChecked',
    Memo = 'spl-memo',
    MintTo = 'mintTo',
    Create = 'create',
  }

  export enum DirectionType {
    Dest = 'destination',
    Source = 'source',
  }

  export interface TransferFilter {
    filter: DirectionType,
    pubkey: PublicKey,
  }

  export const get = async (signature: string):
    Promise<Result<ParsedTransactionWithMeta, Error>> => {
    const res = await Node.getConnection().getParsedTransaction(signature)
      .then(Result.ok)
      .catch(Result.err);
    if (res.isErr) {
      return Result.err(res.error);
    } else {
      if (!res.value) {
        return Result.ok({} as ParsedTransactionWithMeta);
      }
      return Result.ok(res.value);
    }
  }

  export const getForAddress = async (
    pubkey: PublicKey,
    limit?: number | undefined,
    before?: string | undefined,
    until?: string | undefined,
  ): Promise<Result<ParsedTransactionWithMeta, Error>[]> => {
    const transactions = await Node.getConnection().getSignaturesForAddress(
      pubkey,
      {
        limit,
        before,
        until,
      },
    )
      .then(Result.ok)
      .catch(Result.err);

    if (transactions.isErr) {
      return [Result.err(transactions.error)];
    } else {
      const signatures = transactions.value.map(tx => get(tx.signature));
      return await Promise.all(signatures);
    }
  }

  export const getHistory = async (
    pubkey: PublicKey,
    options?: {
      limit?: number,
      actionFilter?: Filter[],
      transferFilter?: TransferFilter,
    }
  ): Promise<Result<TransferHistory[], Error>> => {
   
    if (options === undefined || !Object.keys(options).length) {
      options = {
        limit: 0,
        actionFilter: [],
        transferFilter: undefined,
      }
    }

    const actionFilter =
      options?.actionFilter !== undefined && options.actionFilter.length > 0
        ? options.actionFilter
        : [
          Filter.Transfer,
          Filter.TransferChecked,
        ];

    let bufferedLimit = 0;
    if (options.limit && options.limit < 50) {
      bufferedLimit = options.limit * 1.5; //To get more data, threshold
    } else {
      bufferedLimit = 10;
      options.limit = 10;
    }
    let hist: TransferHistory[] = [];
    let before;

    while (true) {
      const transactions = await Transaction.getForAddress(pubkey, bufferedLimit, before);
      console.debug('# getTransactionHistory loop');
      const res = filterTransactions(
        transactions,
        actionFilter,
        options.transferFilter
      );
      hist = hist.concat(res);
      if (hist.length >= options.limit || res.length === 0) {
        hist = hist.slice(0, options.limit);
        break;
      }
      before = hist[hist.length - 1].sig;
    }
    return Result.ok(hist);
  }

  export const getTokenHistory = async (
    tokenKey: PublicKey,
    pubkey: PublicKey,
    options?: {
      limit?: number,
      actionFilter?: Filter[],
      transferFilter?: TransferFilter
    }
  ): Promise<Result<TransferHistory[], Error>> => {

    const tokenPubkey = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      tokenKey,
      pubkey
    ).then(Result.ok)
      .catch(Result.err);

    if (tokenPubkey.isErr) {
      return Result.err(tokenPubkey.error);
    }
    const actionFilter =
      options?.actionFilter !== undefined && options.actionFilter.length > 0
        ? options.actionFilter
        : [
          Filter.Transfer,
          Filter.TransferChecked,
        ];

    return getHistory(
      tokenPubkey.value,
      {
        limit: options?.limit,
        actionFilter,
        transferFilter: options?.transferFilter
      }
    );
  }

  export const confirmedSig = async (
    signature: string,
    commitment: Commitment = Constants.COMMITMENT
  ): Promise<Result<RpcResponseAndContext<SignatureResult> | unknown, Error>> => {
    return await Node.getConnection().confirmTransaction(signature, commitment)
      .then(Result.ok)
      .catch(Result.err);
  }
}
