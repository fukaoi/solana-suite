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
import axios from 'axios';

export namespace Transaction {

  export const get = async (pubkey: string) => {
    const url = Util.getApiUrl();
    axios.post(`${url}`, {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "getAccountBalance",
      "params": [pubkey],
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  export const sendMySelf = async (
    signer: Keypair,
    instruction: TransactionInstruction,
  ): Promise<TransactionSignature> => {
    const conn = Util.getConnection();
    const tx = new SolanaTransaction().add(instruction);
    const options = {
      skipPreflight: true,
      commitment: Constants.COMMITMENT,
    };
    return sendAndConfirmTransaction(conn, tx, [signer], options);
  }

  export const send = async (
    sourcePubKey: PublicKey,
    signers: Array<Signer>,
    destPubKey: PublicKey,
    amount: number,
  ) => (instruction?: Array<TransactionInstruction>): Promise<TransactionSignature> => {
    const params =
      SystemProgram.transfer({
        fromPubkey: sourcePubKey,
        toPubkey: destPubKey,
        lamports: amount,
      });

    const conn = Util.getConnection();
    const tx = new SolanaTransaction().add(params);
    if (instruction) {
      instruction.forEach((st: TransactionInstruction) => tx.add(st));
    }

    const options = {
      skipPreflight: true,
      commitment: Constants.COMMITMENT,
    };
    return sendAndConfirmTransaction(conn, tx, signers, options);
  }
}
