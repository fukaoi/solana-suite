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
  Connection,
  TransactionInstruction,
} from '@solana/web3.js';

import { Node, Result } from '@solana-suite/shared';

import { AssociatedAccount, Pubkey } from '@solana-suite/core';
import { InitializeMint } from './types/spl-token';

export namespace SplToken {
  const initMint = async (
    connection: Connection,
    owner: PublicKey,
    mintDecimal: number
  ): Promise<Result<InitializeMint, Error>> => {
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
    const blockhashObj = await connection.getRecentBlockhash();
    // since solana v0.1.8
    // const blockhashObj = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;
    transaction.partialSign(keypair);

    return Result.ok({ mint: keypair.publicKey, tx: transaction });
  };

  // select 'new token'
  export const mint = async (
    owner: PublicKey,
    cluster: string,
    totalAmount: number,
    mintDecimal: number,
    signTransaction: (tx: Transaction | Transaction[]) => any
  ): Promise<Result<string, Error>> => {
    Node.changeConnection({ cluster });
    const connection = Node.getConnection();
    const tx = new Transaction();

    const txData = await (
      await initMint(connection, owner, mintDecimal)
    ).unwrap(
      async (ok: InitializeMint) => {
        const data = await AssociatedAccount.makeOrCreateInstruction(
          ok.mint,
          owner
        );
        tx.add(data.unwrap().inst as TransactionInstruction);
        return {
          tokenAccount: data.unwrap().tokenAccount.toPublicKey(),
          mint: ok.mint,
          tx: ok.tx,
        };
      },
      (err) => err
    );

    if ('message' in txData) {
      return Result.err(txData);
    }

    const transaction = tx.add(
      createMintToCheckedInstruction(
        txData.mint,
        txData.tokenAccount,
        owner,
        totalAmount,
        mintDecimal,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    transaction.feePayer = owner;
    const blockhashObj = await connection.getRecentBlockhash();
    // since solana v0.1.8
    // const blockhashObj = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;

    const signed = await signTransaction([txData.tx, transaction]);

    for (let sign of signed) {
      const sig = await connection
        .sendRawTransaction(sign.serialize())
        .then(Result.ok)
        .catch(Result.err);
      if (sig.isErr) {
        return Result.err(sig.error);
      }
      await Node.confirmedSig(sig.unwrap());
    }

    return Result.ok(txData.mint.toString());
  };

  // select 'add token'
  export const addMinting = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    cluster: string,
    totalAmount: number,
    mintDecimal: number,
    signTransaction: (tx: Transaction | Transaction[]) => any
  ): Promise<Result<string, Error>> => {
    Node.changeConnection({ cluster });
    const connection = Node.getConnection();
    const tx = new Transaction();

    const transaction = (
      await AssociatedAccount.makeOrCreateInstruction(tokenKey, owner)
    ).unwrap(
      (ok) => {
        tx.add(ok.inst as TransactionInstruction);
        return tx.add(
          createMintToCheckedInstruction(
            tokenKey,
            ok.tokenAccount.toPublicKey(),
            owner,
            totalAmount,
            mintDecimal,
            [],
            TOKEN_PROGRAM_ID
          )
        );
      },
      (err) => err
    );

    if ('message' in transaction) {
      return Result.err(transaction);
    }

    transaction.feePayer = owner;
    const blockhashObj = await connection.getRecentBlockhash();
    // since solana v0.1.8
    // const blockhashObj = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;

    const signed = await signTransaction([transaction]);

    for (let sign of signed) {
      const sig = await connection
        .sendRawTransaction(sign.serialize())
        .then(Result.ok)
        .catch(Result.err);
      if (sig.isErr) {
        return Result.err(sig.error);
      }
      await Node.confirmedSig(sig.unwrap());
    }

    return Result.ok(tokenKey.toBase58());
  };
}
