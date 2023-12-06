import { SystemProgram } from '@solana/web3.js';
import { Pubkey, Secret } from '~/types/account';
import { Result, Try } from '~/shared';
import { TransactionBuilder } from '~/transaction-builder';
import { AuthorityOptions } from '~/types/shared';
import { CommonStructure } from '~/types/transaction-builder';

export namespace SolNative {
  const RADIX = 10;
  export const transfer = (
    source: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    amount: number,
    options: Partial<AuthorityOptions> = {},
  ): Result<CommonStructure, Error> => {
    return Try(() => {
      const inst = SystemProgram.transfer({
        fromPubkey: source.toPublicKey(),
        toPubkey: dest.toPublicKey(),
        lamports: parseInt(`${amount.toLamports()}`, RADIX),
      });

      const payer = options.feePayer
        ? options.feePayer.toKeypair()
        : signers[0].toKeypair();

      return new TransactionBuilder.Common(
        [inst],
        signers.map((s) => s.toKeypair()),
        payer,
      );
    });
  };
}
