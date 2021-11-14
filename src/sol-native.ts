import {Token, TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  SystemProgram,
  Signer
} from '@solana/web3.js';

import {
  Result,
  Node,
  Constants
} from './';
import {Instruction} from './instruction';
import {Multisig} from './multisig';

export namespace SolNative {

  // NOTICE: There is a lamport fluctuation when transfer under 0.001 sol
  // for multiSig only function

  // @internal
  export const multisigTransfer = async (
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    const connection = Node.getConnection();
    const payer = feePayer ? feePayer : signers[0];
    const wrapped = await Token.createWrappedNativeAccount(
      connection,
      TOKEN_PROGRAM_ID,
      owner,
      payer,
      amount * LAMPORTS_PER_SOL,
    )
      .then(Result.ok)
      .catch(Result.err);

    if (wrapped.isErr) {
      return wrapped.error;
    }

    console.debug('# wrapped sol: ', wrapped.value.toBase58());

    const inst1 = SystemProgram.transfer({
      fromPubkey: owner,
      toPubkey: wrapped.value,
      lamports: 100,
    });

    const inst2 = Token.createCloseAccountInstruction(
      TOKEN_PROGRAM_ID,
      wrapped.value,
      dest,
      owner,
      signers,
    );

    return Result.ok(
      new Instruction(
        [inst1, inst2],
        signers,
        feePayer
      )
    );

    // const token = new Token(
    // connection,
    // Constants.WRAPPED_TOKEN_PROGRAM_ID,
    // TOKEN_PROGRAM_ID,
    // payer
    // );

    // const t = new Transaction();
    // t.feePayer = payer.publicKey;

    // const tx = await Transaction.send(
    // owner,
    // wrapped,
    // [feePayer],
    // 100 // for fee
    // )({
    // feePayer: append?.feePayer,
    // txInstructions: append?.txInstructions
    // });

    // // this point is need multiSig signers
    // await token.closeAccount(
    // wrapped,
    // dest,
    // append!.multiSig!,
    // signers
    // );
    // return tx;
  }

  export const transfer = async (
    source: PublicKey,
    destination: PublicKey,
    signers: Signer[],
    amount: number,
    feePayer?: Signer
  ): Promise<Result<Instruction, Error>> => {
    const isAddress = (await Multisig.isAddress(source)).unwrap();
    if (isAddress) {
      return multisigTransfer(
        source,
        destination,
        signers,
        amount,
      );
    } else {
      const inst = SystemProgram.transfer({
        fromPubkey: source,
        toPubkey: destination,
        lamports: amount,
      });

      return Result.ok(
        new Instruction(
          [inst],
          signers,
          feePayer
        )
      );
    }
  }
}
