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

  export const getAll = async (pubkey: PublicKey): Promise<ParsedConfirmedTransaction[]> => {
    const transactions = await Node.getConnection().getConfirmedSignaturesForAddress2(pubkey);
    const parsedSig: ParsedConfirmedTransaction[] = [];
    for (const tx of transactions) {
      const res = await get(tx!.signature);
      res !== null && parsedSig.push(res);
    }
    return parsedSig;
  }

  export const subscribeAccount = (pubkey: PublicKey, callback: AccountChangeCallback): number =>
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
    source: PublicKey,
    signers: Signer[],
    destination: PublicKey,
    amount: number,
  ) => async (instructions?: TransactionInstruction[]): Promise<TransactionSignature> => {
    const params =
      SystemProgram.transfer({
        fromPubkey: source,
        toPubkey: destination,
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
