import {
  Keypair,
  PublicKey,
  Transaction as SolanaTransaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
  SystemProgram,
  Signer,
  ParsedConfirmedTransaction,
  Commitment,
  RpcResponseAndContext,
  SignatureResult,
  ConfirmedSignatureInfo,
} from '@solana/web3.js';

import {Node} from './node';
import {Constants} from './constants';
import {Result} from './result';

export namespace Transaction {
  export const get = async (signature: string):
    Promise<Result<ParsedConfirmedTransaction | unknown, Error | unknown>> =>
    await Node.getConnection().getParsedConfirmedTransaction(signature)
      .then(Result.ok)
      .catch(Result.fail);

  export const getAll = async (
    pubkey: PublicKey,
    limit?: number
  ): Promise<Result<ParsedConfirmedTransaction[] | unknown, Error | unknown>> => {
    const transactions = await Node.getConnection().getConfirmedSignaturesForAddress2(
      pubkey,
      {limit},
    )
      .then(Result.ok)
      .catch(Result.fail);

    if (transactions.isFail()) return transactions;

    const parsedSig: ParsedConfirmedTransaction[] = [];
    for (const tx of transactions.value as ConfirmedSignatureInfo[]) {
      const res = await get(tx!.signature);
      if (res.isFail()) return res;
      res !== null && parsedSig.push(res.value as ParsedConfirmedTransaction);
    }
    return Result.ok(parsedSig);
  }

  export const confirmedSig = async (
    signature: string,
    commitment: Commitment = 'finalized'
  ): Promise<Result<RpcResponseAndContext<SignatureResult> | unknown, Error | unknown>> => {
    return await Node.getConnection().confirmTransaction(signature, commitment)
      .then(Result.ok)
      .catch(Result.fail);
  }

  export const sendInstructions = async (
    signers: Keypair[],
    instructions: TransactionInstruction[],
  ): Promise<Result<string, Error>> => {
    const tx = new SolanaTransaction().add(instructions[0]);
    if (instructions[1]) {
      instructions.slice(1, instructions.length)
        .forEach((st: TransactionInstruction) => tx.add(st));
    }
    const options = {
      skipPreflight: false,
      commitment: Constants.COMMITMENT,
    };
    const res = await sendAndConfirmTransaction(
      Node.getConnection(),
      tx,
      signers,
      options
    )
      .then(Result.ok)
      .catch(Result.fail);
    return res as Result<string, Error>
  }

  export const send = (
    source: PublicKey,
    signers: Signer[],
    destination: PublicKey,
    amount: number,
  ) => async (instructions?: TransactionInstruction[])
      : Promise<Result<string, Error>> => {
      const params =
        SystemProgram.transfer({
          fromPubkey: source,
          toPubkey: destination,
          lamports: amount,
        });

      const tx = new SolanaTransaction().add(params);
      if (instructions) {
        instructions.forEach((st: TransactionInstruction) => tx.add(st));
      }

      const options = {
        skipPreflight: false,
        commitment: Constants.COMMITMENT,
      };
      const res = await sendAndConfirmTransaction(
        Node.getConnection(),
        tx,
        signers,
        options
      )
        .then(Result.ok)
        .catch(Result.fail);
      return res as Result<string, Error>
    }
}
