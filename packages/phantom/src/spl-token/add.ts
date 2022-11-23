import {
  TOKEN_PROGRAM_ID,
  createMintToCheckedInstruction,
} from '@solana/spl-token';

import {
  Transaction,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';

import { Node, Result, Try } from '@solana-suite/shared';

import { AssociatedAccount } from '@solana-suite/core';
import { Phantom } from '../types';

export namespace SplTokenPhantom {
  export const add = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    cluster: string,
    totalAmount: number,
    mintDecimal: number,
    phantom: Phantom
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      Node.changeConnection({ cluster });
      const connection = Node.getConnection();
      const transaction = new Transaction();

      const makeInstruction = await AssociatedAccount.makeOrCreateInstruction(
        tokenKey,
        owner
      );
      transaction.add(makeInstruction.inst as TransactionInstruction);
      transaction.add(
        createMintToCheckedInstruction(
          tokenKey,
          makeInstruction.tokenAccount.toPublicKey(),
          owner,
          totalAmount,
          mintDecimal,
          [],
          TOKEN_PROGRAM_ID
        )
      );

      transaction.feePayer = owner;
      const blockhashObj = await connection.getLatestBlockhashAndContext();
      transaction.recentBlockhash = blockhashObj.value.blockhash;

      const signed = await phantom.signAllTransactions([transaction]);

      // todo: refactoring
      for (const sign of signed) {
        const sig = await connection.sendRawTransaction(sign.serialize());
        await Node.confirmedSig(sig);
      }
      return tokenKey.toBase58();
    });
  };
}
