import {
  ParsedConfirmedTransaction,
  ParsedInstruction,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';

import bs from 'bs58';
import {Constants} from './';

export namespace Memo {
  export const decode = (encoded: string): string =>
    bs.decode(encoded).toString();

  export const encode = (data: string): Buffer => Buffer.from(data);

  export const createInstruction = (data: string, owners: PublicKey[] = [])
    : TransactionInstruction => {



    const key =
      owners.length > 0
        ?
        owners.map(owner => {
          return {
            pubkey: owner,
            isSigner: true,
            isWritable: true
          }
        }
        )
        : [];

    return new TransactionInstruction({
      programId: Constants.MEMO_PROGRAM_ID,
      data: encode(data),
      keys: key
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
}
