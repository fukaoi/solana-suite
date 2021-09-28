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
} from '@solana/web3.js';

import {Util} from './util';
import {Constants} from './constants';
import bs from 'bs58';
import fetch from 'cross-fetch';

export namespace Transaction {

  export const get = async (signature: string) =>
    Util.getConnection().getParsedConfirmedTransaction(signature);

  export const get2 = async (signature: string) => {
  fetch("https://api.devnet.solana.com/", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      method: "getConfirmedTransaction",
      jsonrpc: "2.0",
      params: [signature, "jsonParsed"],
      id: 1,
    }),
    method: "POST",
  })
    .then((r) => {
      return r.json();
    })
    .then((json: any) => {
      console.log(json);
      if (json && json.result) {
        let transaction = json.result.transaction;
        let instruction = transaction.message.instructions[0];
        console.log('# instruction:', instruction);
        let relevantInfo = {
          BlockTime: json.result.blockTime,
          Program: instruction.program,
          ProgramID: instruction.programId,
          Type: instruction.parsed.type,
          Amount: instruction.parsed.info.amount,
          Destination: instruction.parsed.info.destination,
          Slot: json.result.slot,
          Source: instruction.parsed.info.source,
        };
        console.log(relevantInfo);
      }
    })
    .then(console.log)
    .catch(console.warn);
  }

  export const getAll = async (pubkeyStr: string) => {
    const pubkey = new PublicKey(pubkeyStr);
    const transactions = await Util.getConnection().getConfirmedSignaturesForAddress2(pubkey);
    return transactions.map(async (transaction) => {
      // await get2(transaction.signature);
      const res = await get(transaction.signature);
      // res!.transaction.message.instructions.map(inst => {
        // console.log(bs.decode(inst.data).toString());
      // })
      console.log('----------------------------');
      // console.log(res!.transaction.message.instructions[0]);
      console.log(res);
    });
  }

  export const subscribeAccount = (pubkey: string, callback: AccountChangeCallback): number =>
    Util.getConnection().onAccountChange(new PublicKey(pubkey), callback);

  export const unsubscribeAccount = (subscribeId: number): Promise<void> =>
    Util.getConnection().removeAccountChangeListener(subscribeId);

  export const sendInstructions = async (
    signers: Keypair[],
    instructions: TransactionInstruction[],
  ): Promise<TransactionSignature> => {

    const conn = Util.getConnection();
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
