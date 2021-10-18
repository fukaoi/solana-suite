import {
  AccountInfo,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {
  Keypair,
  ParsedConfirmedTransaction,
  ParsedInstruction,
  PublicKey,
  TokenBalance,
  TransactionInstruction,
} from '@solana/web3.js';

import {Transaction, Node, Result} from './';

export namespace SplToken {
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
  }

  const isTransfer = (value: ParsedInstruction) => {
    if (value.program === 'spl-token') {
      switch (value.parsed.type) {
        case TransactionStatus.Transfer:
        case TransactionStatus.TransferChecked:
          return true;
        default:
          return false;
      }
    } else {
      return false;
    }
  }

  const convertTimestmapToDate = (blockTime: number) =>
    new Date(blockTime * 1000);

  export const subscribeAccount = (
    pubkey: PublicKey,
    callback: any
  ): number => {
    return Node.getConnection().onAccountChange(pubkey, async () => {
      const res = await SplToken.getTransferHistory(pubkey, 1);
      if (res.isFail()) return res;
      callback((<TransferHistory[]>res.value)[0]);
    });
  }

  export const unsubscribeAccount = (subscribeId: number): Promise<void> =>
    Node.getConnection().removeAccountChangeListener(subscribeId);


  export const getTransferHistory = async (
    pubkey: PublicKey,
    limit?: number
  ): Promise<Result<TransferHistory[], Error>> => {
    const transactions = await Transaction.getAll(pubkey, limit);

    if (transactions.isFail()) return <Result<[], Error>>transactions;

    const hist: TransferHistory[] = [];
    for (const tx of <ParsedConfirmedTransaction[]>transactions.value) {
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

    if (transactions.isFail()) return <Result<[], Error>>transactions;

    const hist: TransferDestinationList[] = [];
    for (const tx of <ParsedConfirmedTransaction[]>transactions.value) {
      const posts = tx.meta?.postTokenBalances as TokenBalance[];
      if (posts.length > 1) {
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

  export const create = async (
    source: Keypair,
    totalAmount: number,
    mintDecimal: number,
    authority: PublicKey = source.publicKey,
  ): Promise<Result<string, Error>> => {
    const connection = Node.getConnection();

    const tokenRes = await Token.createMint(
      connection, source,
      authority,
      null,
      mintDecimal,
      TOKEN_PROGRAM_ID
    )
      .then(Result.ok)
      .catch(Result.fail);

    if (tokenRes.isFail()) return <Result<string, Error>>tokenRes;

    const token = <Token>tokenRes.value;

    const tokenAssociated = await token.createAssociatedTokenAccount(
      source.publicKey
    )
      .then(Result.ok)
      .catch(Result.fail);

    if (tokenAssociated.isFail()) return  <Result<string, Error>>tokenAssociated;

    const res = await token.mintTo(
      <PublicKey>tokenAssociated.value,
      authority,
      [],
      totalAmount,
    )
      .then(Result.ok)
      .catch(Result.fail);

    if (res.isFail()) return <Result<string, Error>>res;

    return Result.ok(token.publicKey.toBase58());
  }

  export const transfer = async (
    tokenKey: PublicKey,
    source: Keypair,
    dest: PublicKey,
    amount: number,
    mintDecimal: number,
    instruction?: TransactionInstruction
  ): Promise<Result<string, Error>> => {
    const token = new Token(Node.getConnection(), tokenKey, TOKEN_PROGRAM_ID, source);
    const sourceToken = await token.getOrCreateAssociatedAccountInfo(source.publicKey)
      .then(Result.ok)
      .catch(Result.fail);

    if (sourceToken.isFail()) return <Result<string, Error>>sourceToken;

    const destToken = await token.getOrCreateAssociatedAccountInfo(dest)
      .then(Result.ok)
      .catch(Result.fail);

    if (destToken.isFail()) return <Result<string, Error>>destToken;

    const param = Token.createTransferCheckedInstruction(
      TOKEN_PROGRAM_ID,
      (<AccountInfo>sourceToken.value).address,
      tokenKey,
      (<AccountInfo>destToken.value).address,
      source.publicKey,
      [source],
      amount,
      mintDecimal
    );

    const instructions = instruction ? new Array(param, instruction) : [param];
    const fn = Transaction.send(
      source.publicKey,
      [source],
      dest,
      amount,
    );
    return await fn(instructions);
  }
}
