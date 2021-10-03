import {
  Keypair,
  PublicKey,
  Transaction as SolanaTransaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
  TransactionSignature,
  SystemProgram,
  Signer,
  ParsedConfirmedTransaction,
  AccountChangeCallback,
  ParsedAccountData,
  AccountInfo,
} from '@solana/web3.js';

import {Node} from './node';
import {Constants} from './constants';
import bs from 'bs58';

export namespace Transaction {

  interface SubscribeData<T> {
    lamports: number,
    owner: string,
    parsed: T
  }

  const parseAccountData = (data: Buffer) => {
    const amountData = data.slice(64, 74)
    const amount = amountData.readUInt32LE(0) + (amountData.readUInt32LE(4) * 2 ** 32)
    return {
      token: new PublicKey(data.slice(0, 32)),
      owner: new PublicKey(data.slice(32, 64)),
      amount
    }
  }

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

  export const subscribeAccount = (
    pubkey: PublicKey,
    // callback: (data: SubscribeData<Buffer>) => void
    callback: AccountChangeCallback
  ): number => {
    return Node.getConnection().onAccountChange(pubkey, callback, 'confirmed')

    // return Node.getConnection().onAccountChange(pubkey, (data, _) => {
      // callback(data, _);
      // console.log(parseAccountData(data.data));
      // // const subscribeData: SubscribeData<ParsedAccountData> = {
      // // lamports: data.lamports,
      // // owner: data.owner.toBase58(),
      // // parsed: data
      // // }
      // // callback(subscribeData);
    // }, 'singleGossip');
  }

  export const unsubscribeAccount = (subscribeId: number): Promise<void> =>
    Node.getConnection().removeAccountChangeListener(subscribeId);

  export const sendInstructions = async (
    signers: Keypair[],
    instructions: TransactionInstruction[],
  ): Promise<TransactionSignature> => {

    const conn = Node.getConnection();
    const tx = new SolanaTransaction().add(instructions[0]);
    if (instructions[1]) {
      instructions.slice(1, instructions.length)
        .forEach((st: TransactionInstruction) => tx.add(st));
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
