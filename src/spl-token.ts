import {
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {
  Keypair,
  ParsedInstruction,
  PublicKey,
  TokenBalance,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {Transaction} from './transaction';
import {Node} from './node';
import {Result} from './result';

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
      callback(res[0]);
    });
  }

  export const unsubscribeAccount = (subscribeId: number): Promise<void> =>
    Node.getConnection().removeAccountChangeListener(subscribeId);


  export const getTransferHistory = async (pubkey: PublicKey, limit?: number): Promise<TransferHistory[]> => {
    const transactions = await Transaction.getAll(pubkey, limit);
    const hist: TransferHistory[] = [];
    for (const tx of transactions) {
      for (const inst of tx.transaction.message.instructions) {
        const value = inst as ParsedInstruction;
        if (isTransfer(value)) {
          const v: TransferHistory = value.parsed;
          v.date = convertTimestmapToDate(tx.blockTime as number);
          hist.push(v);
        }
      }
    }
    return hist;
  }

  export const getTransferDestinationList = async (pubkey: PublicKey): Promise<TransferDestinationList[]> => {
    const transactions = await Transaction.getAll(pubkey);
    const hist: TransferDestinationList[] = [];
    for (const tx of transactions) {
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
    return hist;
  }

  export const create = async (
    source: Keypair,
    totalAmount: number,
    mintDecimal: number,
    authority: PublicKey = source.publicKey,
  ): Promise<string> => {
    const connection = Node.getConnection();

    const token = await Token.createMint(
      connection,
      source,
      authority,
      null,
      mintDecimal,
      TOKEN_PROGRAM_ID
    );

    const tokenAccount = await token.createAssociatedTokenAccount(source.publicKey);

    await token.mintTo(
      tokenAccount,
      authority,
      [],
      totalAmount,
    );

    return token.publicKey.toBase58();
  }

  export const transfer = async (
    tokenKey: PublicKey,
    source: Keypair,
    dest: PublicKey,
    amount: number,
    mintDecimal: number,
    instruction?: TransactionInstruction
  ): Promise<Result<string | unknown, Error | unknown>> => {
    const token = new Token(Node.getConnection(), tokenKey, TOKEN_PROGRAM_ID, source);
    const sourceTokenAccount = (await token.getOrCreateAssociatedAccountInfo(source.publicKey)).address;
    const destTokenAccount = (await token.getOrCreateAssociatedAccountInfo(dest)).address;

    const param = Token.createTransferCheckedInstruction(
      TOKEN_PROGRAM_ID,
      sourceTokenAccount,
      tokenKey,
      destTokenAccount,
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
