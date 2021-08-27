import {
  Keypair,
  PublicKey,
  Transaction as SolanaTransaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
  TransactionSignature,
  SystemProgram,
  Signer,
} from '@solana/web3.js';

import {Util} from './util';
import {Constants} from './constants';

export namespace Transaction {

  export const get = async (signature: string) =>
    Util.getConnection().getTransaction(signature);

  //todo:  export const sendInstructions = async (
  export const sendMySelf = async (
    signer: Keypair,
    instructions: TransactionInstruction[],
  ): Promise<TransactionSignature> => {
    const conn = Util.getConnection();
    instructions.forEach((st: TransactionInstruction) => tx.add(st));
    const tx = new SolanaTransaction().add(instructions[0]);
    if (instructions[1]) {
      instructions.slice(1, instructions.length).forEach((st: TransactionInstruction) => tx.add(st));
    }
    const options = {
      skipPreflight: true,
      commitment: Constants.COMMITMENT,
    };
    return sendAndConfirmTransaction(conn, tx, [signer], options);
  }

  export const send = async (
    sourcePublicKey: PublicKey,
    signers: Signer[],
    destPublicKey: PublicKey,
    amount: number,
  ) => (instructions?: TransactionInstruction[]): Promise<TransactionSignature> => {
    const params =
      SystemProgram.transfer({
        fromPubkey: sourcePublicKey,
        toPubkey: destPublicKey,
        lamports: amount,
      });

    const conn = Util.getConnection();
    const tx = new SolanaTransaction().add(params);
    if (instructions) {
      instructions.forEach((st: TransactionInstruction) => tx.add(st));
    }

    const options = {
      skipPreflight: true,
      commitment: Constants.COMMITMENT,
    };
    return sendAndConfirmTransaction(conn, tx, signers, options);
  }
}
