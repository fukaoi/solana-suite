import {NATIVE_MINT, Token, TOKEN_PROGRAM_ID} from '@solana/spl-token';
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

export namespace SolNative {

  // NOTICE: There is a lamport fluctuation when transfer under 0.001 sol
  // for multiSig only function
  export const multisigTransfer = async (
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amountSol: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    const connection = Node.getConnection();
    const payer = feePayer ? feePayer : signers[0];
    const wrapped = await Token.createWrappedNativeAccount(
      connection,
      TOKEN_PROGRAM_ID,
      owner,
      payer,
      amountSol * LAMPORTS_PER_SOL,
    )
      .then(Result.ok)
      .catch(Result.err);

    if (wrapped.isErr) {
      return wrapped.error;
    }

    console.debug('# wrapped sol: ', wrapped.value.toBase58());

    const token = new Token(
      connection,
      Constants.WRAPPED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      payer
    );

    const sourceToken = await token.getOrCreateAssociatedAccountInfo(owner)
      .then(Result.ok)
      .catch(Result.err);

    if (sourceToken.isErr) {
      return Result.err(sourceToken.error);
    }

    const destToken = await token.getOrCreateAssociatedAccountInfo(wrapped.value)
      .then(Result.ok)
      .catch(Result.err);

    if (destToken.isErr) {
      return Result.err(destToken.error);
    }

    const inst1 = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      sourceToken.value.address,
      destToken.value.address,
      owner,
      signers,
      amountSol
    );

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
  }

  export const transfer = async (
    source: PublicKey,
    destination: PublicKey,
    signers: Signer[],
    amountSol: number,
    feePayer?: Signer
  ): Promise<Result<Instruction, Error>> => {
    const inst = SystemProgram.transfer({
      fromPubkey: source,
      toPubkey: destination,
      lamports: amountSol * LAMPORTS_PER_SOL,
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
