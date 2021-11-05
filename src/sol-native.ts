import {Token, TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction as SolanaTransaction,
  SystemProgram,
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
      if (!Append.isInFeePayer(append.feePayer, signers))
        return Result.err(Error('Not found fee payer secret key in signers'));
      feePayer = Transaction.fetchFeePayerKeypair(
        append?.feePayer,
        signers
      )[0];
    }

    let multiSigSigners: Keypair[] = [];
    if (append?.multiSig) {
      let onlySigners = signers;
      if (append?.feePayer) {
        // exclude keypair of fee payer
        onlySigners = Transaction.fetchExcludeFeePayerKeypair(append?.feePayer, signers);
      }
      const multiSigRes = await Append.isInMultisig(append.multiSig, onlySigners);
      if (multiSigRes.isErr) return Result.err(multiSigRes.error);

      if (!multiSigRes.value)
        return Result.err(Error('Not found singer of multiSig in signers'));

      multiSigSigners = signers;
    }

    // append.txInstructions.forEach(
    // (instruction: TransactionInstruction) => t.add(instruction)
    // );

    const connection = Node.getConnection();

    const wrapped = await Token.createWrappedNativeAccount(
      connection,
      TOKEN_PROGRAM_ID,
      source,
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

    const tx = await sendAndConfirmTransaction(
      connection,
      t.add(
        SystemProgram.transfer({
          fromPubkey: source,
          toPubkey: wrapped,
          lamports: 100
        }),
      ),
      signers,
    );

    // await token.closeAccount(wrapped, dest, signers[0], []);
    // await token.closeAccount(wrapped, dest, source, multiSigSigners);
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
