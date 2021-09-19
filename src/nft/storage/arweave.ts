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
import {fetch} from 'node-fetch';
import  FormData from 'form-data';

export namespace StorageArweave {
    const MANIFEST_FILE = 'manifest.json';

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
    const buffers: Buffer[] = [];
    buffers.push(await fs.promises.readFile(imagePath));
    const data = Buffer.from(JSON.stringify({name, description}));
    buffers.push(data);

    const payer = Util.createKeypair(payerSecret);

    const inst = await createPayArweaveCostInst(payer.publicKey, buffers);
    const signature = await Transaction.sendInstructions(
      [payer],
      inst
    );

    await Util.getConnection().confirmTransaction(signature, 'max');
    const uploadData = new FormData();
    uploadData.append('tags', JSON.stringify({name, description}));
    uploadData.append('transaction', signature);
    buffers.map(f => uploadData.append('file[]', f));

    const result = await fetch(
      Constants.ARWEAVE_UPLOAD_SRV_URL,
      {
        method: 'POST',
        body: data
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
