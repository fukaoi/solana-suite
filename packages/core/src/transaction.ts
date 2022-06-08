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

import {
  getAssociatedTokenAddress,
} from '@solana/spl-token';

export namespace Transaction {

  // type guard
  const isParsedInstructon = (arg: any): arg is ParsedInstruction => {
    return arg !== null && typeof arg === 'object' && arg.parsed;
  }

  const createHistory = (
    searchKey: PublicKey,
    instruction: ParsedInstruction,
    meta: ParsedTransactionWithMeta,
    directionFilter?: DirectionFilter,
    mappingTokenAccount?: any[],
    isToken?: boolean,
    withMemos?: any[]
  ) => {
    const v: TransferHistory = instruction.parsed;

    if (isToken && instruction.program === 'spl-token') {
      const foundSource = mappingTokenAccount!.find(m => m.account === v.info.source);
      const foundDest = mappingTokenAccount!.find(m => m.account === v.info.destination);
      v.info.source = foundSource.owner;
      v.info.destination = foundDest.owner;
    }


    v.date = convertTimestmapToDate(meta.blockTime as number);
    v.sig = meta.transaction.signatures[0];
    v.innerInstruction = false;
    if (withMemos && withMemos.length > 0) {
      v.memo = withMemos.find(obj => obj.sig === meta.transaction.signatures).memo;
    }

    // inner instructions
    if (meta.meta?.innerInstructions
      && meta.meta?.innerInstructions.length !== 0) {
      v.innerInstruction = true;
    }

    if (directionFilter) {
      if (v.info[directionFilter] === searchKey.toString()) {
        return v;
      }
    } else {
      return v;
    }
  }

  const createMemoHistory = (
    searchKey: PublicKey,
    instruction: ParsedInstruction,
    value: ParsedTransactionWithMeta,
    directionFilter?: DirectionFilter
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
    if (directionFilter) {
      if (v.info[directionFilter] === searchKey.toString()) {
        return v;
      }
    } else {
      return v;
    }
  }

  const filterTransactions = (
    searchKey: PublicKey,
    transactions: Result<ParsedTransactionWithMeta>[],
    filterOptions: Filter[],
    isToken: boolean = false,
    directionFilter?: DirectionFilter,
  ) => {
    const hist: TransferHistory[] = [];
    const mappingTokenAccount: {account: string, owner: string}[] = [];
    transactions.forEach(tx => {
      if (tx.isErr) return tx;

      const accountKeys = tx.value.transaction.message.accountKeys.map(t => t.pubkey.toBase58());
      // set  mapping list
      tx.value.meta?.postTokenBalances?.forEach(t => {
        if (accountKeys[t.accountIndex] && t.owner) {
          const v = {
            account: accountKeys[t.accountIndex],
            owner: t.owner
          }
          mappingTokenAccount.push(v);
        }
      });

      // set transaction with memo
      const withMemos: {sig: string[], memo: string}[] = [];
      tx.value.transaction.message.instructions.forEach(v => {
        if (isParsedInstructon(v) && v.program === 'spl-memo') {
          withMemos.push({
            sig: tx.value.transaction.signatures,
            memo: v.parsed
          });
        }
      });

      tx.value.transaction.message.instructions.forEach(instruction => {
        if (isParsedInstructon(instruction)) {
          if (isToken && instruction.program !== 'spl-token') {
            return;
          }

          if (filterOptions.includes(instruction.parsed.type)) {
            const res = createHistory(
              searchKey,
              instruction,
              tx.value,
              directionFilter,
              mappingTokenAccount,
              isToken,
              withMemos,
            );
            res && hist.push(res);
          } else {
            // Only memo
            if (filterOptions.includes(Filter.OnlyMemo)) {
              const res = createMemoHistory(searchKey, instruction, tx.value, directionFilter);
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

  export enum Filter {
    Transfer = 'transfer',
    TransferChecked = 'transferChecked',
    OnlyMemo = 'spl-memo',
    MintTo = 'mintTo',
    Create = 'create',
  }

  export enum DirectionFilter {
    Dest = 'destination',
    Source = 'source',
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
    searchPubkey: PublicKey,
    options?: {
      limit?: number,
      actionFilter?: Filter[],
      directionFilter?: DirectionFilter,
    }
  ): Promise<Result<TransferHistory[], Error>> => {

    if (options === undefined || !Object.keys(options).length) {
      options = {
        limit: 0,
        actionFilter: [],
        directionFilter: undefined,
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
      bufferedLimit = options.limit * 1.5; // To get more data, threshold
    } else {
      bufferedLimit = 10;
      options.limit = 10;
    }
    let hist: TransferHistory[] = [];
    let before;

    while (true) {
      const transactions = await Transaction.getForAddress(searchPubkey, bufferedLimit, before);
      console.debug('# getTransactionHistory loop');
      const res = filterTransactions(
        searchPubkey,
        transactions,
        actionFilter,
        false,
        options.directionFilter
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
    mint: PublicKey,
    searchPubkey: PublicKey,
    options?: {
      limit?: number,
      actionFilter?: Filter[],
      directionFilter?: DirectionFilter
    }
  ): Promise<Result<TransferHistory[], Error>> => {

    if (options === undefined || !Object.keys(options).length) {
      options = {
        limit: 0,
        actionFilter: [],
        directionFilter: undefined,
      }
    }

    const actionFilter =
      options?.actionFilter !== undefined && options.actionFilter.length > 0
        ? options.actionFilter
        : [
          Filter.Transfer,
          Filter.TransferChecked,
        ];

    const searchKeyAccount = await getAssociatedTokenAddress(
      mint,
      searchPubkey,
      true,
    ).then(Result.ok)
      .catch(Result.err);

    if (searchKeyAccount.isErr) {
      return Result.err(searchKeyAccount.error);
    }

    let bufferedLimit = 0;
    if (options.limit && options.limit < 50) {
      bufferedLimit = options.limit * 1.5; // To get more data, threshold
    } else {
      bufferedLimit = 10;
      options.limit = 10;
    }
    let hist: TransferHistory[] = [];
    let before;

    while (true) {
      const transactions = await Transaction.getForAddress(searchKeyAccount.value, bufferedLimit, before);
      console.debug('# getTransactionHistory loop');
      const res = filterTransactions(
        searchPubkey,
        transactions,
        actionFilter,
        true,
        options.directionFilter
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

  export const confirmedSig = async (
    signature: string,
    commitment: Commitment = Constants.COMMITMENT
  ): Promise<Result<RpcResponseAndContext<SignatureResult> | unknown, Error>> => {
    /** @deprecated Instead, call `confirmTransaction` using a `TransactionConfirmationConfig` */
    return await Node.getConnection().confirmTransaction(signature, commitment)
      .then(Result.ok)
      .catch(Result.err);
  }
}
