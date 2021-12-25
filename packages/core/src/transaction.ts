import {
  PublicKey,
  ParsedConfirmedTransaction,
  Commitment,
  RpcResponseAndContext,
  SignatureResult,
  ConfirmedSignatureInfo,
  ParsedInstruction,
  TokenBalance,
} from '@solana/web3.js';

import {
  Node,
  Result,
  Constants
} from '@solana-suite/shared';

export namespace Transaction {

  // type guard
  const isParsedInstructon = (arg: any): arg is ParsedInstruction => {
    return arg !== null && typeof arg === 'object' && arg.parsed;
  }

  const filterTransactions = (
    transactions: ParsedConfirmedTransaction[],
    filterOptions: DefaultFilter[]
  ) => {
    const hist: TransferHistory[] = [];
    transactions.forEach(tx => {
      tx.transaction.message.instructions.forEach(t => {
        if (isParsedInstructon(t)) {
          if (filterOptions.includes(t.parsed.type)) {
            const v: TransferHistory = t.parsed;
            v.date = convertTimestmapToDate(tx.blockTime as number);
            v.sig = tx.transaction.signatures[0];
            if (tx.meta?.innerInstructions && tx.meta?.innerInstructions.length !== 0) {
              // inner instructions
              v.innerInstruction = true;
            } else {
              v.innerInstruction = false;
            }
            hist.push(v);
          }
        }
      });
    });
    console.log(hist);
    return hist;
  }

  const convertTimestmapToDate = (blockTime: number): Date =>
    new Date(blockTime * 1000);

  export const subscribeAccount = (
    pubkey: PublicKey,
    callback: any
  ): number => {
    return Node.getConnection().onAccountChange(pubkey, async () => {
      const res = await getTransferHistory(pubkey, 1);
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
      destination: string,
      source: string,
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
  }

  export interface TransferDestinationList {
    dest: PublicKey,
    date: Date,
  }

  enum DefaultFilter {
    Transfer = 'transfer',
    TransferChecked = 'transferChecked',
    Memo = 'memo',
    MintTo = 'mintTo',
    Create = 'create',
  }

  export const get = async (signature: string):
    Promise<Result<ParsedConfirmedTransaction | unknown, Error>> =>
    await Node.getConnection().getParsedConfirmedTransaction(signature)
      .then(Result.ok)
      .catch(Result.err);

  export const getAll = async (
    pubkey: PublicKey,
    limit?: number,
  ): Promise<Result<ParsedConfirmedTransaction[] | unknown, Error>> => {
    const transactions = await Node.getConnection().getSignaturesForAddress(
      pubkey,
      {limit},
    )
      .then(Result.ok)
      .catch(Result.err);

    if (transactions.isErr) {
      return transactions;
    } else {
      const parsedSig: ParsedConfirmedTransaction[] = [];
      for (const tx of transactions.value as ConfirmedSignatureInfo[]) {
        const res = await get(tx!.signature);
        if (res.isErr) return res;
        res !== null && parsedSig.push(res.value as ParsedConfirmedTransaction);
      }
      return Result.ok(parsedSig);
    }
  }

  export const getTransferHistory = async (
    pubkey: PublicKey,
    limit?: number,
    filterOptions?: DefaultFilter[]
  ): Promise<Result<TransferHistory[], Error>> => {

    const filter = filterOptions ? filterOptions : [
      DefaultFilter.Memo,
      DefaultFilter.Transfer,
      DefaultFilter.TransferChecked,
      DefaultFilter.MintTo,
      DefaultFilter.Create,
    ];
    const transactions = await Transaction.getAll(pubkey, limit);

    if (transactions.isErr) {
      return transactions as Result<[], Error>;
    }
    const tx = transactions.unwrap() as ParsedConfirmedTransaction[];
    return Result.ok(filterTransactions(tx, filter));
  }

  export const getTransferDestinationList = async (
    pubkey: PublicKey
  ): Promise<Result<TransferDestinationList[], Error>> => {
    const transactions = await Transaction.getAll(pubkey);

    if (transactions.isErr) {
      return Result.err(transactions.error);
    }

    const hist: TransferDestinationList[] = [];
    for (const tx of transactions.unwrap() as ParsedConfirmedTransaction[]) {
      const posts = tx.meta?.postTokenBalances as TokenBalance[];
      if (posts.length > 0) {
        posts.forEach((p) => {
          const amount = p!.uiTokenAmount!.uiAmount as number;
          if (amount > 0) {
            const index = p.accountIndex;
            const dest = tx.transaction.message.accountKeys[index].pubkey;
            const date = convertTimestmapToDate(tx.blockTime as number);
            const v: TransferDestinationList = {dest, date};
            hist.push(v);
          }
        });
      }
    }
    return Result.ok(hist);
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
