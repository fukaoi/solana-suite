import {TOKEN_PROGRAM_ID, Token} from 'old-spl-token';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Signer,
  Transaction
} from '@solana/web3.js';

import {
  Result,
  Node,
  Constants,
  Instruction,
  PartialSignInstruction,
} from '@solana-suite/shared';
import {SplToken} from './spl-token';

export namespace SolNative {

  // NOTICE: There is a lamport fluctuation when transfer under 0.001 sol
  // for multiSig only function
  export const transferWithMultisig = async (
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

    const sourceToken = await SplToken.retryGetOrCreateAssociatedAccountInfo(
      token.publicKey,
      owner,
      feePayer!
    );

    if (sourceToken.isErr) {
      return Result.err(sourceToken.error);
    }

    const destToken = await SplToken.retryGetOrCreateAssociatedAccountInfo(
      token.publicKey,
      wrapped.value,
      feePayer!
    );

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

  export const feePayerPartialSignTransfer = async (
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    feePayer: PublicKey,
  ): Promise<Result<PartialSignInstruction, Error>> => {
    const tx = new Transaction(
      {
        feePayer: feePayer
      }
    ).add(
      SystemProgram.transfer(
        {
          fromPubkey: owner,
          toPubkey: dest,
          lamports: amount * LAMPORTS_PER_SOL,
        }
      ),
    );

    // partially sign transaction
    const blockhashObj = await Node.getConnection().getLatestBlockhash();
    tx.recentBlockhash = blockhashObj.blockhash;
    signers.forEach(signer => {
      tx.partialSign(signer);
    });

    try {
      const sirializedTx = tx.serialize(
        {
          requireAllSignatures: false,
        }
      )
      const hex = sirializedTx.toString('hex');
      return Result.ok(new PartialSignInstruction(hex));
    } catch (ex) {
      return Result.err(ex as Error);
    }
  }

}
