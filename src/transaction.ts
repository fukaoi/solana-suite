import {
  PublicKey,
  Transaction as SolanaTransaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
  TransactionSignature,
  SystemProgram,
  Signer,
  ParsedConfirmedTransaction,
  Commitment,
  RpcResponseAndContext,
  SignatureResult,
  ConfirmedSignatureInfo,
} from '@solana/web3.js';

import {Node, Result} from './';
import {Constants} from './constants';

export namespace Transaction {
  export interface AppendValue {
    signers: Signer[],
    feePayer?: PublicKey,
    txInstructions?: TransactionInstruction[],
  }

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

  export const sendInstruction = () =>
    async (append: AppendValue)
      : Promise<Result<TransactionSignature, Error>> => {

      if (!append.txInstructions)
        return Result.err(new Error('Need set TransactionInstructions'));

      const tx = new SolanaTransaction().add(append.txInstructions[0]);

      if (append.txInstructions[1]) {
        append.txInstructions.slice(1, append.txInstructions.length)
          .forEach((st: TransactionInstruction) => tx.add(st));
      }

      if (!append.signers)
        return Result.err(new Error('Need set signers'));

      return await sendAndConfirmTransaction(
        Node.getConnection(),
        tx,
        append.signers,
      )
        .then(Result.ok)
        .catch(Result.err);
    }

  export const send = (
    source: PublicKey,
    destination: PublicKey,
    amount: number,
  ) => async (append: AppendValue)
      : Promise<Result<TransactionSignature, Error>> => {
      const params =
        SystemProgram.transfer({
          fromPubkey: source,
          toPubkey: destination,
          lamports: amount,
        });

      const t = new SolanaTransaction();
      if (!append.feePayer) {
        t.feePayer = append.signers[0].publicKey;
      } else {
        // check existed fee payer address in signers
        const addresses = append.signers.map(s => s.publicKey.toBase58());
        if (!addresses.indexOf(append.feePayer.toBase58())) {
          return Result.err(new Error('Need include fee payer keypair in signers'));
        }
        t.feePayer = append.feePayer;
      }

      const tx = t.add(params);
      if (append.txInstructions)
        append.txInstructions.forEach((st: TransactionInstruction) => tx.add(st));

      return await sendAndConfirmTransaction(
        Node.getConnection(),
        tx,
        append.signers,
      )
        .then(Result.ok)
        .catch(Result.err);
    }
}
