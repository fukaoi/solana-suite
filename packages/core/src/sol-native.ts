import {
  createWrappedNativeAccount,
  createMint,
  createTransferInstruction,
  createCloseAccountInstruction,
} from '@solana/spl-token';

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
  Instruction,
  PartialSignInstruction,
  debugLog,
} from '@solana-suite/shared';

import {SplToken} from './spl-token';

export namespace SolNative {

  const RADIX = 10;

  // NOTICE: There is a lamports fluctuation when transfer under 0.001 sol
  // for multiSig only function
  export const transferWithMultisig = async (
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    const connection = Node.getConnection();
    const payer = feePayer ? feePayer : signers[0];
    const wrapped = await createWrappedNativeAccount(
      connection,
      payer,
      owner,
      parseInt(`${amount * LAMPORTS_PER_SOL}`, RADIX),
    )
      .then(Result.ok)
      .catch(Result.err);

    if (wrapped.isErr) {
      return wrapped.error;
    }

    debugLog('# wrapped sol: ', wrapped.value.toBase58());

    const tokenRes = await createMint(
      connection,
      payer,
      owner,
      owner,
      0,
    )
      .then(Result.ok)
      .catch(Result.err);

    if (tokenRes.isErr) {
      return Result.err(tokenRes.error);
    }

    const token = tokenRes.value;



    const sourceToken = await SplToken.retryGetOrCreateAssociatedAccountInfo(
      token,
      owner,
      payer
    );

    if (sourceToken.isErr) {
      return Result.err(sourceToken.error);
    }

    debugLog('# sourceToken: ', sourceToken.value);

    const destToken = await SplToken.retryGetOrCreateAssociatedAccountInfo(
      token,
      wrapped.value,
      payer
    );

    if (destToken.isErr) {
      return Result.err(destToken.error);
    }

    debugLog('# destToken: ', destToken.value);

    const inst1 = createTransferInstruction(
      sourceToken.value.toPublicKey(),
      destToken.value.toPublicKey(),
      owner,
      parseInt(`${amount}`, RADIX), // No lamports, its sol
      signers,
    );

    const inst2 = createCloseAccountInstruction(
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
    amount: number,
    feePayer?: Signer
  ): Promise<Result<Instruction, Error>> => {
    const inst = SystemProgram.transfer({
      fromPubkey: source,
      toPubkey: destination,
      lamports: parseInt(`${amount * LAMPORTS_PER_SOL}`, RADIX),
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

    const blockhashObj = await Node.getConnection().getLatestBlockhash();
    const tx = new Transaction({
      blockhash: blockhashObj.blockhash,
      lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
      feePayer
    }).add(
      SystemProgram.transfer(
        {
          fromPubkey: owner,
          toPubkey: dest,
          lamports: parseInt(`${amount * LAMPORTS_PER_SOL}`, RADIX),
        }
      ),
    );

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
