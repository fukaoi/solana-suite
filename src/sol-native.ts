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
    const onlySigners = await Append.extractOnlySignerKeypair(
      signers,
      append?.feePayer,
      append?.multiSig,
    );

    if (onlySigners.isErr) return onlySigners;
    source = (onlySigners.unwrap() as Keypair[])[0].publicKey;

    const sol = amount * LAMPORTS_PER_SOL;
    let feePayer = signers[0];
    if (append?.feePayer) {
      feePayer = Append.extractFeePayerKeypair(
        signers,
        append?.feePayer,
      )[0];
    }

    const connection = Node.getConnection();
    const wrapped = await Token.createWrappedNativeAccount(
      connection,
      TOKEN_PROGRAM_ID,
      append!.multiSig!,
      feePayer,
      sol
    );

    console.debug('# wrapped sol: ', wrapped.toBase58());

    const token = new Token(
      connection,
      Constants.WRAPPED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      feePayer
    );

    const t = new SolanaTransaction();
    t.feePayer = feePayer.publicKey;

    const tx = await Transaction.send(
      source,
      wrapped,
      [feePayer],
      sol
    )({
      feePayer: append?.feePayer,
      txInstructions: append?.txInstructions
    });

    // this point is need multiSig signers
    await token.closeAccount(
      wrapped,
      dest,
      append!.multiSig!,
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
