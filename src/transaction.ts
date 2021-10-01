import {
  Keypair,
  PublicKey,
  Transaction as SolanaTransaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
  TransactionSignature,
  SystemProgram,
  Signer,
  AccountChangeCallback,
  ParsedConfirmedTransaction,
} from '@solana/web3.js';

import {Node} from './node';
import {Constants} from './constants';

export namespace Transaction {

  export const get = async (signature: string): Promise<ParsedConfirmedTransaction | null> =>
    await Node.getConnection().getParsedConfirmedTransaction(signature);

  export const getAll = async (pubkeyStr: string): Promise<ParsedConfirmedTransaction[]> => {
    const pubkey = new PublicKey(pubkeyStr);
    const transactions = await Node.getConnection().getConfirmedSignaturesForAddress2(pubkey);
    const parsedSig: ParsedConfirmedTransaction[] = [];
    for (const tx of transactions) {
      const res = await get(tx!.signature);
      res !== null && parsedSig.push(res);
    }
    return parsedSig;
  }

  export const subscribeAccount = (pubkey: string, callback: AccountChangeCallback): number =>
    Node.getConnection().onAccountChange(new PublicKey(pubkey), callback);

  export const unsubscribeAccount = (subscribeId: number): Promise<void> =>
    Node.getConnection().removeAccountChangeListener(subscribeId);

  export const sendInstructions = async (
    signers: Keypair[],
    instructions: TransactionInstruction[],
  ): Promise<TransactionSignature> => {

    const conn = Node.getConnection();
    const tx = new SolanaTransaction().add(instructions[0]);
    if (instructions[1]) {
      instructions.slice(1, instructions.length).forEach((st: TransactionInstruction) => tx.add(st));
    }
    const options = {
      skipPreflight: true,
      commitment: Constants.COMMITMENT,
    };
    return sendAndConfirmTransaction(conn, tx, signers, options);
  }

  export const send = (
    sourcePublicKey: PublicKey,
    signers: Signer[],
    destPublicKey: PublicKey,
    amount: number,
  ) => async (instructions?: TransactionInstruction[]): Promise<TransactionSignature> => {
    const params =
      SystemProgram.transfer({
        fromPubkey: sourcePublicKey,
        toPubkey: destPublicKey,
        lamports: amount,
      });

    const conn = Node.getConnection();
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
