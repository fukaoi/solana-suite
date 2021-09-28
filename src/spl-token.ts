import {
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {
  Account,
  ParsedInstruction,
  PublicKey,
  TokenBalance,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {Util} from './util';
import {Transaction} from './transaction';

export namespace SplToken {
  interface TransferHistory {
    info: {
      amount: string,
      authority: string,
      destination: string,
      source: string,
    },
    type: string,
    date: Date,
  }

  interface TransferDestinationList {
    destination: string,
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

  export const getTransferHistory = async (pubkeyStr: string): Promise<TransferHistory[]> => {
    const transactions = await Transaction.getAll(pubkeyStr);
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

  export const getTransferDestinationList = async (pubkeyStr: string): Promise<TransferDestinationList[]> => {
    const transactions = await Transaction.getAll(pubkeyStr);
    const hist: TransferDestinationList[] = [];
    for (const tx of transactions) {
      const posts = tx.meta?.postTokenBalances as TokenBalance[];
      if (posts.length > 1) {
        posts.forEach((p) => {
          const amount = p!.uiTokenAmount!.uiAmount as number;
          if (amount > 0) {
            const index = p.accountIndex;
            const destination = tx.transaction.message.accountKeys[index].pubkey.toString();
            const date = convertTimestmapToDate(tx.blockTime as number);
            const v: TransferDestinationList = {destination, date};
            hist.push(v);
          }
        });
      }
    }
    return hist;
  }

  export const create = async (
    sourceSecret: string,
    totalAmount: number,
    decimal: number,
    authority: string = Util.createKeypair(sourceSecret).publicKey.toBase58(),
  ): Promise<string> => {
    const connection = Util.getConnection();
    const signer = new Account(Util.createKeypair(sourceSecret).secretKey);
    const authorityPubKey = new PublicKey(authority);

    const token = await Token.createMint(
      connection,
      signer,
      authorityPubKey,
      null,
      decimal,
      TOKEN_PROGRAM_ID
    );

    const tokenAccount = await token.createAssociatedTokenAccount(signer.publicKey);

    await token.mintTo(
      tokenAccount,
      authorityPubKey,
      [],
      totalAmount,
    );

    return token.publicKey.toBase58();
  }

  export const transfer = async (
    tokenId: string,
    sourceSecret: string,
    destination: string,
    amount: number,
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    const tokenPubkey = new PublicKey(tokenId);
    const destPubkey = new PublicKey(destination);
    const signer = Util.createKeypair(sourceSecret);
    const token = new Token(Util.getConnection(), tokenPubkey, TOKEN_PROGRAM_ID, signer);
    const sourceTokenAccount = (await token.getOrCreateAssociatedAccountInfo(signer.publicKey)).address;
    const destTokenAccount = (await token.getOrCreateAssociatedAccountInfo(destPubkey)).address;

    console.debug(`[sourceTokenAccount:${sourceTokenAccount.toBase58()}]=>[destTokenAccount:${destTokenAccount.toBase58()}]`);

    const param = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      sourceTokenAccount,
      destTokenAccount,
      signer.publicKey,
      [],
      amount
    );

    const instructions = instruction ? new Array(param, instruction) : [param];
    const fn = Transaction.send(
      signer.publicKey,
      [signer],
      destPubkey,
      amount,
    );
    return await fn(instructions);
  }
}
