import {
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';


import {
  ParsedConfirmedTransaction,
  ParsedInstruction,
  PublicKey,
  TokenBalance,
  Signer,
} from '@solana/web3.js';

import {Transaction} from './';
import {Node, Result, Instruction} from '@solana-suite/shared';

export namespace SplToken {

  const NFT_AMOUNT =1;
  const NFT_DECIMALS =0;

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

  enum TransactionStatus {
    Transfer = 'transfer',
    TransferChecked = 'transferChecked',
    Memo = 'memo',
  }

  const isTransfer = (value: ParsedInstruction) => {
    if (value.program === 'spl-token') {
      switch (value.parsed.type) {
        case TransactionStatus.Transfer:
        case TransactionStatus.TransferChecked:
        case TransactionStatus.Memo:
          return true;
        default:
          return false;
      }
    } else {
      return false;
    }
  }

  const convertTimestmapToDate = (blockTime: number): Date =>
    new Date(blockTime * 1000);

  export const subscribeAccount = (
    pubkey: PublicKey,
    callback: any
  ): number => {
    return Node.getConnection().onAccountChange(pubkey, async () => {
      const res = await SplToken.getTransferHistory(pubkey, 1);
      if (res.isErr) {
        return res;
      }
      callback((res.value as TransferHistory[])[0]);
    });
  }

  export const unsubscribeAccount = (subscribeId: number)
    : Promise<void> =>
    Node.getConnection().removeAccountChangeListener(subscribeId);


  export const getTransferHistory = async (
    pubkey: PublicKey,
    limit?: number
  ): Promise<Result<TransferHistory[], Error>> => {
    const transactions = await Transaction.getAll(pubkey, limit);

    if (transactions.isErr) {
      return transactions as Result<[], Error>;
    }

    const hist: TransferHistory[] = [];
    for (const tx of transactions.unwrap() as ParsedConfirmedTransaction[]) {
      for (const inst of tx.transaction.message.instructions) {
        const value = inst as ParsedInstruction;
        if (isTransfer(value)) {
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

  export const mint = async (
    owner: PublicKey,
    signers: Signer[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    !feePayer && (feePayer = signers[0]);

    const tokenRes = await Token.createMint(
      Node.getConnection(),
      feePayer,
      owner,
      owner,
      mintDecimal,
      TOKEN_PROGRAM_ID
    )
      .then(Result.ok)
      .catch(Result.err);

    if (tokenRes.isErr) {
      return Result.err(tokenRes.error);
    }

    const token = tokenRes.value;

    const tokenAssociated =
      await token.getOrCreateAssociatedAccountInfo(owner)
        .then(Result.ok)
        .catch(Result.err);

    if (tokenAssociated.isErr) {
      return Result.err(tokenAssociated.error);
    }

    const inst = Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      token.publicKey,
      tokenAssociated.value.address,
      owner,
      signers,
      totalAmount
    );

    return Result.ok(
      new Instruction(
        [inst],
        signers,
        feePayer,
        token.publicKey.toBase58()
      )
    );
  }

  export const transfer = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    mintDecimal: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    !feePayer && (feePayer = signers[0]);

    const token = new Token(
      Node.getConnection(),
      tokenKey,
      TOKEN_PROGRAM_ID,
      feePayer
    );

    const sourceToken = await token.getOrCreateAssociatedAccountInfo(owner)
      .then(Result.ok)
      .catch(Result.err);

    if (sourceToken.isErr) {
      return Result.err(sourceToken.error);
    }

    const destToken = await token.getOrCreateAssociatedAccountInfo(dest)
      .then(Result.ok)
      .catch(Result.err);

    if (destToken.isErr) {
      return Result.err(destToken.error);
    }

    const inst = Token.createTransferCheckedInstruction(
      TOKEN_PROGRAM_ID,
      sourceToken.value.address,
      tokenKey,
      destToken.value.address,
      owner,
      signers,
      amount,
      mintDecimal
    );

    return Result.ok(
      new Instruction(
        [inst],
        signers,
        feePayer
      ));
  }

  export const transferNft = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {
    return transfer(
      tokenKey,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  }
}
