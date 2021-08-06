import {
  PublicKey,
  TransactionInstruction,
  TransactionResponse,
  TransactionSignature
} from '@solana/web3.js';

import bs from 'bs58';

import {Transaction} from './transaction';
import {Constants} from './constants';
import {Util} from './util';

export namespace Memo {
  const MEMO_PROGRAMID = new PublicKey(Constants.MEMO_PROGRAMID);

  export const decode = (encoded: string): string => bs.decode(encoded).toString();

  export const encode = (data: any): Buffer => Buffer.from(data);

  export const createInstruction = (data: any): TransactionInstruction => {
    return new TransactionInstruction({
      programId: MEMO_PROGRAMID,
      data: encode(data),
      keys: []
    });
  };

  export const parseInstruction = (tx: TransactionResponse): any => {
    const compiled = tx.transaction.message.instructions.filter((d: any) => d.accounts.length === 0);
    return decode(compiled[0].data);
  }

  export const own = async (
    instruction: TransactionInstruction,
    sourceSecret: string
  ): Promise<TransactionSignature> => {
    return await Transaction.sendMySelf(Util.createKeypair(sourceSecret), instruction);
  }
}


