import { PublicKey, SystemProgram, Keypair } from '@solana/web3.js';
import { Result, Instruction, Try } from '@solana-suite/shared';

export namespace SolNative {
  const RADIX = 10;
  export const transfer = (
    source: PublicKey,
    destination: PublicKey,
    signers: Keypair[],
    amount: number,
    feePayer?: Keypair
  ): Result<Instruction, Error> => {
    return Try(() => {
      const inst = SystemProgram.transfer({
        fromPubkey: source,
        toPubkey: destination,
        lamports: parseInt(`${amount.toLamports()}`, RADIX),
      });

      return new Instruction([inst], signers, feePayer);
    });
  };
}
