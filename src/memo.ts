import {
  ParsedConfirmedTransaction,
  PublicKey,
  ParsedInstruction,
  TransactionInstruction,
  TransactionSignature
} from '@solana/web3.js';

import bs from 'bs58';

import {Transaction} from './transaction';
import {Constants} from './constants';
import {Util} from './util';

export namespace Memo {
  const MEMO_PROGRAM_ID = new PublicKey(Constants.MEMO_PROGRAM_ID);

  export const decode = (encoded: string): string => bs.decode(encoded).toString();

  export const encode = (data: any): Buffer => Buffer.from(data);

  export const createInstruction = (data: any): TransactionInstruction => {
    return new TransactionInstruction({
      programId: MEMO_PROGRAM_ID,
      data: encode(data),
      keys: []
    });
  };

  export const parseInstruction = (tx: ParsedConfirmedTransaction): string => {
    const res = tx.transaction.message.instructions.filter(d => {
      const value = d as ParsedInstruction;
      return value.program === 'spl-memo';
    }) as ParsedInstruction[];
    return res[0].parsed;
  }

  export const own = async (
    instruction: TransactionInstruction,
    sourceSecret: string
  ): Promise<TransactionSignature> =>
    await Transaction.sendInstructions(
      [Util.createKeypair(sourceSecret)],
      [instruction]
    );
}


