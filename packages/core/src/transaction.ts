import {
  PublicKey,
  ParsedConfirmedTransaction,
  Commitment,
  RpcResponseAndContext,
  SignatureResult,
  ConfirmedSignatureInfo,
  ParsedInstruction,
  TokenBalance,
  PartiallyDecodedInstruction,
} from '@solana/web3.js';

import {
  Node,
  Result,
  Constants
} from '@solana-suite/shared';

import bs from 'bs58';

export namespace Transaction {

  const isParsedInstructon = (arg: any): arg is ParsedInstruction => {
    return arg !== null && typeof arg === 'object' && arg.parsed;
  }

  const filterStatus = (
    value: ParsedInstruction | PartiallyDecodedInstruction,
    filterOptions: DefaultFilter[]
  ) => {
    if (isParsedInstructon(value)) {
      return filterOptions.includes(value.parsed.type);
    }
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
      DefaultFilter.MintTo
    ];
    const transactions = await Transaction.getAll(pubkey, limit);

    if (transactions.isErr) {
      return transactions as Result<[], Error>;
    }
    const hist: TransferHistory[] = [];
    console.log('SIZE: ', (transactions.unwrap() as ParsedConfirmedTransaction[]).length);
    for (const tx of transactions.unwrap() as ParsedConfirmedTransaction[]) {
      for (const inst of tx.transaction.message.instructions) {
        isParsedInstructon(inst) ? (tx.transaction) : tx.transaction.message.instructions.forEach(value => {
          if (isParsedInstructon(value)) {
              console.log(value.parsed);
            if (filterStatus(value, filter)) {
              const v: TransferHistory = value.parsed;
              v.date = convertTimestmapToDate(tx.blockTime as number);
              hist.push(v);
            }
          }
        });
        const value = inst as ParsedInstruction;
        if (filterStatus(value, filter)) {
          const v: TransferHistory = value.parsed;
          v.date = convertTimestmapToDate(tx.blockTime as number);
          hist.push(v);
        }
      }
    }
    return Result.ok(hist);
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
