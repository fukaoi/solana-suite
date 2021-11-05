import {Token, TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction as SolanaTransaction,
} from '@solana/web3.js';

import {
  Append,
  Transaction,
  Result,
  Node,
  Constants
} from './';

export namespace SolNative {
  export const wrappedTransfer = (
    source: PublicKey,
    dest: PublicKey,
    signers: Keypair[],
    amount: number,
  ) => async (append?: Append.Value) => {

    let feePayer = signers[0];
    if (append?.feePayer) {
      feePayer = Transaction.fetchFeePayerKeypair(
        append?.feePayer,
        signers
      )[0];
    }

    const connection = Node.getConnection();
    const wrapped = await Token.createWrappedNativeAccount(
      connection,
      TOKEN_PROGRAM_ID,
      append!.multiSig!,
      feePayer,
      amount * LAMPORTS_PER_SOL
    );

    const token = new Token(
      connection,
      Constants.WRAPPED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      feePayer
    );

    const t = new SolanaTransaction();
    t.feePayer = feePayer.publicKey;

    console.log(wrapped.toBase58(), append!.multiSig!.toBase58());

    const tx = await Transaction.send(
      source,
      wrapped,
      [feePayer],
      amount
    )({
      feePayer: append?.feePayer,
      txInstructions: append?.txInstructions
    });

    await token.closeAccount(
      wrapped, 
      dest, append!.multiSig!, 
      signers
    );
    return tx;
  }

  export const transfer = (
    source: PublicKey,
    destination: PublicKey,
    signers: Keypair[],
    amount: number,
  ) => async (append?: Append.Value)
      : Promise<Result<string, Error>> => {
      const sol = amount * LAMPORTS_PER_SOL;
      return Transaction.send(
        source,
        destination,
        signers,
        sol,
      )(append);
    }
}
