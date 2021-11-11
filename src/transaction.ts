import {
  PublicKey,
  Transaction as SolanaTransaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
  TransactionSignature,
  SystemProgram,
  ParsedConfirmedTransaction,
  Commitment,
  RpcResponseAndContext,
  SignatureResult,
  ConfirmedSignatureInfo,
  Keypair,
} from '@solana/web3.js';

import {Node, Result, Append, Constants} from './';

export namespace Transaction {

  export const get = async (signature: string):
    Promise<Result<ParsedConfirmedTransaction | unknown, Error>> =>
    await Node.getConnection().getParsedConfirmedTransaction(signature)
      .then(Result.ok)
      .catch(Result.err);

  export const getAll = async (
    pubkey: PublicKey,
    limit?: number
  ): Promise<Result<ParsedConfirmedTransaction[] | unknown, Error>> => {
    const transactions = await Node.getConnection().getConfirmedSignaturesForAddress2(
      pubkey,
      {limit},
    )
      .then(Result.ok)
      .catch(Result.err);

    if (transactions.isErr) {
      return transactions;
    } else {
      const parsedSig: ParsedConfirmedTransaction[] = [];
      for (const tx of transactions.value as ConfirmedSignatureInfo[]) {
        const res = await get(tx!.signature);
        if (res.isErr) return res;
        res !== null && parsedSig.push(res.value as ParsedConfirmedTransaction);
      }
      return Result.ok(parsedSig);
    }
  }

  export const confirmedSig = async (
    signature: string,
    commitment: Commitment = Constants.COMMITMENT
  ): Promise<Result<RpcResponseAndContext<SignatureResult> | unknown, Error>> => {
    return await Node.getConnection().confirmTransaction(signature, commitment)
      .then(Result.ok)
      .catch(Result.err);
  }

  export const sendInstruction = (
    signers: Keypair[]
  ) =>
    async (append: Append.Value)
      : Promise<Result<TransactionSignature, Error>> => {

      if (!append.txInstructions)
        return Result.err(Error('Need set TransactionInstructions'));

      const t = new SolanaTransaction();

      // Check comformability of fee payer
      if (append?.feePayer) {
        if (!Append.isInFeePayer(append.feePayer, signers))
          return Result.err(Error('Not found fee payer secret key in signers'));
        t.feePayer = Append.extractFeePayerKeypair(
          signers,
          append?.feePayer,
        )[0].publicKey;
      } else {
        t.feePayer = signers[0].publicKey;
      }

      if (append?.multiSig) {
        let onlySigners = signers;
        if (append?.feePayer) {
          const extracted = await Append.extractMultiSigKeypair(
            signers,
            append.multiSig,
          );
          if (extracted.isErr) return Result.err(extracted.error);
          onlySigners = extracted.value as Keypair[];

        }
        const multiSigRes = await Append.isInMultisig(append.multiSig, onlySigners);
        if (multiSigRes.isErr) return Result.err(multiSigRes.error);

        if (!multiSigRes.value)
          return Result.err(Error('Not found singer of multiSig in signers'));

      }

      append.txInstructions.forEach(
        (instruction: TransactionInstruction) => t.add(instruction)
      );

      return await sendAndConfirmTransaction(
        Node.getConnection(),
        t,
        signers,
      )
        .then(Result.ok)
        .catch(Result.err);
    }

  export const send = (
    source: PublicKey,
    destination: PublicKey,
    signers: Keypair[],
    amount: number,
  ) => async (append?: Append.Value)
      : Promise<Result<TransactionSignature, Error>> => {
      const params =
        SystemProgram.transfer({
          fromPubkey: source,
          toPubkey: destination,
          lamports: amount,
        });

      const t = new SolanaTransaction();

      // Check comformability of fee payer
      if (append?.feePayer) {
        // if (!Append.isInFeePayer(append.feePayer, signers))
          // return Result.err(Error('Not found fee payer secret key in signers'));
        t.feePayer = Append.extractFeePayerKeypair(
          signers,
          append?.feePayer,
        )[0].publicKey;
      } else {
        t.feePayer = signers[0].publicKey;
      }

      console.log('feePayer: ', t.feePayer.toBase58());
      console.log('signers: ', signers.map(s => s.publicKey.toBase58()));

      // if (append?.multiSig) {
        // let onlySigners = signers;
        // if (append?.feePayer) {
          // const extracted = await Append.extractMultiSigKeypair(
            // signers,
            // append.multiSig,
          // );
          // if (extracted.isErr) return Result.err(extracted.error);
          // onlySigners = extracted.value as Keypair[];
        // }
        // const multiSigRes = await Append.isInMultisig(append.multiSig, onlySigners);
        // if (multiSigRes.isErr) return Result.err(multiSigRes.error);

        // if (!multiSigRes.value)
          // return Result.err(Error('Not found singer of multiSig in signers'));
      // }

      const tx = t.add(params);
      if (append?.txInstructions)
        append.txInstructions.forEach((st: TransactionInstruction) => tx.add(st));

      return await sendAndConfirmTransaction(
        Node.getConnection(),
        tx,
        signers,
      )
        .then(Result.ok)
        .catch(Result.err);
    }
}
