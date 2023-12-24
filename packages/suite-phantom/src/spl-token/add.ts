import {
  createMintToCheckedInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import { Transaction, TransactionInstruction } from '@solana/web3.js';

import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { Pubkey } from '~/types/account';
import { Account } from '~/account';
import { PhantomProvider } from '~/types/phantom';

export namespace PhantomSplToken {
  /**
   * Adding new token to existing token
   *
   * @param {Pubkey}  token
   * @param {Pubkey}  owner
   * @param {string}  cluster
   * @param {number}  totalAmount
   * @param {number}  mintDecimal
   * @param {Phantom} phantom //phantom wallet object
   * @return Promise<Result<string, Error>>
   */
  export const add = async (
    token: Pubkey,
    owner: Pubkey,
    cluster: string,
    totalAmount: number,
    mintDecimal: number,
    phantom: PhantomProvider,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      Node.changeConnection({ cluster });
      const connection = Node.getConnection();
      const transaction = new Transaction();

      const makeInstruction = await Account.Associated.makeOrCreateInstruction(
        token,
        owner,
      );
      transaction.add(makeInstruction.inst as TransactionInstruction);
      transaction.add(
        createMintToCheckedInstruction(
          token.toPublicKey(),
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

      // TODO: refactoring
      for (const sign of signed) {
        const sig = await connection.sendRawTransaction(sign.serialize());
        await Node.confirmedSig(sig);
      }
      return token;
    });
  };
}
