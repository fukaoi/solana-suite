import {
  ParsedInstruction,
  PublicKey,
  TransactionInstruction,
  Signer,
  ParsedTransactionWithMeta,
} from '@solana/web3.js';

import bs from 'bs58';
import {Constants, Instruction} from '@solana-suite/shared';

export namespace Memo {
  export const decode = (encoded: string): string =>
    bs.decode(encoded).toString();

  export const encode = (data: string): Buffer => Buffer.from(data);

  export const create = (
    data: string,
    owners: PublicKey[],
    signers: Signer[],
    feePayer?: Signer,
  )
    : Instruction => {

    const key =
      owners && owners.length > 0
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

    const instruction = new TransactionInstruction({
      programId: Constants.MEMO_PROGRAM_ID,
      data: encode(data),
      keys: key
    });
    return new Instruction(
      [instruction],
      signers,
      feePayer,
    );
  };

  export const parse = (tx: ParsedTransactionWithMeta):
    string => {
    const res = tx.transaction.message.instructions.filter(d => {
      const value = d as ParsedInstruction;
      return value.program === 'spl-memo';
    }) as ParsedInstruction[];
    return res[0].parsed;
  }
}
