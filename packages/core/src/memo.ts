import { TransactionInstruction } from '@solana/web3.js';
import { Constants, Instruction, Pubkey, Secret } from '@solana-suite/shared';
import bs from 'bs58';

export namespace Memo {
  export const decode = (encoded: string): string =>
    bs.decode(encoded).toString();

  export const encode = (data: string): Buffer => Buffer.from(data);

  export const create = (
    data: string,
    owner: Pubkey,
    signer: Secret
  ): Instruction => {
    const key = owner.toPublicKey()
      ? [
          {
            pubkey: owner.toPublicKey(),
            isSigner: false,
            isWritable: true,
          },
        ]
      : [];

    const instruction = new TransactionInstruction({
      programId: Constants.MEMO_PROGRAM_ID,
      data: encode(data),
      keys: key,
    });
    return new Instruction(
      [instruction],
      [signer],
      signer
    );
  };
}
