import {
  Keypair,
  ParsedConfirmedTransaction,
  ParsedInstruction,
  TransactionInstruction,
} from '@solana/web3.js';

import bs from 'bs58';
import {Result} from '@badrap/result';

import {Transaction, Constants} from './';

export namespace Memo {
  export const decode = (encoded: string): string =>
    bs.decode(encoded).toString();

  export const encode = (data: string): Buffer => Buffer.from(data);

  export const createInstruction = (data: string):
    TransactionInstruction => {
    return new TransactionInstruction({
      programId: Constants.MEMO_PROGRAM_ID,
      data: encode(data),
      keys: []
    });
  };

  export const parseInstruction = (tx: ParsedConfirmedTransaction):
    string => {
    const res = tx.transaction.message.instructions.filter(d => {
      const value = d as ParsedInstruction;
      return value.program === 'spl-memo';
    }) as ParsedInstruction[];
    return res[0].parsed;
  }

  export const own = async (
    instruction: TransactionInstruction,
    source: Keypair
  ): Promise<Result<string, Error>> =>
    await Transaction.sendInstructions(
      [source],
      [instruction]
    );
}


