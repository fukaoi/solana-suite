import fs from 'fs';

import {
  SystemProgram,
  TransactionInstruction,
  PublicKey,
} from '@solana/web3.js';
import {Constants} from '../../constants';
import crypto from 'crypto';
import {Transaction} from '../../transaction';
import {Util} from '../../util';
import fetch from 'cross-fetch';
// import fetch from 'node-fetch';
// import FormData from 'form-data';
import {FormData as FormData2} from "formdata-node";
import * as anchor from "@project-serum/anchor";

export namespace StorageArweave {
  const MATADAT_FILE = 'metadata.json';

  interface ArweaveResult {
    error?: string;
    messages?: {
      filename: string;
      status: 'success' | 'fail';
      transactionId?: string;
      error?: string;
    }[];
  }

  const calculateArFee = () => {
    return 10;
  }

  export const upload = async (
    payerSecret: string,
    name: string,
    description: string,
    imagePath: string
  ) => {
    const fileBuffer = await fs.promises.readFile(imagePath, 'utf8');
    const payer = Util.createKeypair(payerSecret);

    // const inst = await createPayArweaveCostInst(payer.publicKey, buffers);
    // const signature = await Transaction.sendInstructions(
    // [payer],
    // inst
    // );


    const inst = [
      anchor.web3.SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: new PublicKey(Constants.AR_SOL_HOLDER_ID),
        lamports: 10,
      }),
    ];

    // const signature = await Transaction.sendInstructions(
      // [payer],
      // inst
    // );

    // await Util.getConnection().confirmTransaction(signature, 'max').then(console.log);
    const signature = '4sJXEhkzy2H9AT8YK2PcLgaDs6q1qiH5iieU6qLfY4YUipxADNAzfmgeTssP4yH2W2vUTgfUnsmpxqV3j9efPX99';
    const uploadData = new FormData2();
    uploadData.append('transaction', signature);
    uploadData.append('env', 'devnet');
    uploadData.append('text', 'text');

    const result = await fetch(
      Constants.ARWEAVE_UPLOAD_SRV_URL,
      {
        method: 'POST',
        body: uploadData as FormData
      }
    );
    console.log(result);
  }

  const createPayArweaveCostInst = async (
    payerPubKey: PublicKey,
    buffers: Buffer[],
  ): Promise<TransactionInstruction[]> => {
    const instructions: TransactionInstruction[] = [];

    instructions.push(
      SystemProgram.transfer({
        fromPubkey: payerPubKey,
        toPubkey: new PublicKey(Constants.AR_SOL_HOLDER_ID),
        lamports: calculateArFee(),
      }),
    );

    for (const buffer of buffers) {
      const hashSum = crypto.createHash('sha256');
      hashSum.update(buffer.toString());
      const hex = hashSum.digest('hex');
      instructions.push(
        new TransactionInstruction({
          keys: [],
          programId: new PublicKey(Constants.MEMO_PROGRAM_ID),
          data: Buffer.from(hex),
        }),
      );
    }
    return instructions;
  }
}
