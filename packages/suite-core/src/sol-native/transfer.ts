import { SystemProgram } from '@solana/web3.js';
import { Result, Instruction, Try, Pubkey, Secret } from 'shared';

export namespace SolNative {
  const RADIX = 10;
  export const transfer = (
    source: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    amount: number,
    feePayer?: Secret,
  ): Result<Instruction, Error> => {
    return Try(() => {
      const inst = SystemProgram.transfer({
        fromPubkey: source.toPublicKey(),
        toPubkey: dest.toPublicKey(),
        lamports: parseInt(`${amount.toLamports()}`, RADIX),
      });

      const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();

      return new Instruction(
        [inst],
        signers.map((s) => s.toKeypair()),
        payer,
      );
    });
  };
}
