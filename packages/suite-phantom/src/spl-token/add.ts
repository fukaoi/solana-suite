import {
  createMintToCheckedInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import { Transaction, TransactionInstruction } from '@solana/web3.js';

import { Result, Try } from 'shared';
import { Node } from 'node';
import { Pubkey } from 'types/account';
import { AssociatedAccount } from 'account';
import { Phantom } from 'types/phantom';

export namespace PhantomSplToken {
  export const add = async (
    tokenKey: Pubkey,
    owner: Pubkey,
    cluster: string,
    totalAmount: number,
    mintDecimal: number,
    phantom: Phantom,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      Node.changeConnection({ cluster });
      const connection = Node.getConnection();
      const transaction = new Transaction();

      const makeInstruction = await AssociatedAccount.makeOrCreateInstruction(
        tokenKey,
        owner,
      );
      transaction.add(makeInstruction.inst as TransactionInstruction);
      transaction.add(
        createMintToCheckedInstruction(
          tokenKey.toPublicKey(),
          makeInstruction.tokenAccount.toPublicKey(),
          owner.toPublicKey(),
          totalAmount,
          mintDecimal,
          [],
          TOKEN_PROGRAM_ID,
        ),
      );

      transaction.feePayer = owner.toPublicKey();
      const blockhashObj = await connection.getLatestBlockhashAndContext();
      transaction.recentBlockhash = blockhashObj.value.blockhash;

      const signed = await phantom.signAllTransactions([transaction]);

      // todo: refactoring
      for (const sign of signed) {
        const sig = await connection.sendRawTransaction(sign.serialize());
        await Node.confirmedSig(sig);
      }
      return tokenKey;
    });
  };
}
