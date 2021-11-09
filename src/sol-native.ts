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

  // NOTICE: There is a lamport fluctuation when transfer under 0.001 sol
  // for multiSig only function
  const multisigTransfer = (
    source: PublicKey,
    dest: PublicKey,
    signers: Keypair[],
    amount: number,
  ) => async (append?: Append.Value)
      : Promise<Result<string, Error>> => {
      if (!append?.multiSig)
        return Result.err(Error('Need to set append.multiSig param'));

      const onlySigners = await Append.extractOnlySignerKeypair(
        signers,
        undefined,
        append!.multiSig!,
      );

      if (onlySigners.isErr) return Result.err(onlySigners.error);
      source = (onlySigners.unwrap() as Keypair[])[0].publicKey;
      let feePayer = (onlySigners.unwrap() as Keypair[])[0];

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
        amount * LAMPORTS_PER_SOL,
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
        100 // for fee
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
      if (append?.multiSig) {
        return multisigTransfer(
          source,
          destination,
          signers,
          amount,
        )(append);
      } else {
        return Transaction.send(
          source,
          destination,
          signers,
          amount * LAMPORTS_PER_SOL,
        )(append);
      }
    }
}
