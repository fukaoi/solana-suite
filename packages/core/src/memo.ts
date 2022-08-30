import {
  PublicKey,
  TransactionInstruction,
  Keypair,
} from '@solana/web3.js';

import bs from 'bs58';
import {Constants, Instruction} from '@solana-suite/shared';

export namespace Memo {
  export const decode = (encoded: string): string =>
    bs.decode(encoded).toString();

  export const encode = (data: string): Buffer => Buffer.from(data);

  export const create = (
    data: string,
    owner: PublicKey,
    signer: Keypair,
  )
    : Instruction => {

    const key =
      owner
        ? [{
          pubkey: owner,
          isSigner: false,
          isWritable: true
        }]
        : [];

    const instruction = new TransactionInstruction({
      programId: Constants.MEMO_PROGRAM_ID,
      data: encode(data),
      keys: key
    });
    return new Instruction(
      [instruction],
      [signer],
      signer,
    );
  };
}
