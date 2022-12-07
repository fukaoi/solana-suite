import {
  MINT_SIZE,
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  createMintToCheckedInstruction,
} from '@solana/spl-token';

import {
  Transaction,
  SystemProgram,
  PublicKey,
  Keypair,
  TransactionInstruction,
} from '@solana/web3.js';

import { Node, Result, Try } from '@solana-suite/shared';

import { AssociatedAccount } from '@solana-suite/core';
import { InitializeMint, Phantom } from '../types';

export namespace PhantomSplToken {
  const createTokenBuilder = async (
    owner: PublicKey,
    mintDecimal: number,
  ): Promise<InitializeMint> => {
    const connection = Node.getConnection();
    const keypair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),

      createInitializeMintInstruction(
        keypair.publicKey,
        mintDecimal,
        owner,
        owner,
        TOKEN_PROGRAM_ID
      )
    );

    transaction.feePayer = owner;
    const blockhashObj = await connection.getLatestBlockhashAndContext();
    transaction.recentBlockhash = blockhashObj.value.blockhash;
    transaction.partialSign(keypair);
    return { mint: keypair, tx: transaction };
  };

  // select 'new token'
  export const mint = async (
    owner: PublicKey,
    cluster: string,
    totalAmount: number,
    mintDecimal: number,
    phantom: Phantom
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      Node.changeConnection({ cluster });
      const connection = Node.getConnection();
      const tx = new Transaction();

      const builder = await createTokenBuilder(owner, mintDecimal);
      const data = await AssociatedAccount.makeOrCreateInstruction(
        builder.mint.publicKey,
        owner
      );
      tx.add(data.inst as TransactionInstruction);

      const transaction = tx.add(
        createMintToCheckedInstruction(
          builder.mint.publicKey,
          data.tokenAccount.toPublicKey(),
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

      const signed = await phantom.signAllTransactions([
        builder.tx,
        transaction,
      ]);

      // todo: refactoring
      for (const sign of signed) {
        const sig = await connection.sendRawTransaction(sign.serialize());
        await Node.confirmedSig(sig);
      }
      return builder.mint.publicKey.toString();
    });
  };
}
