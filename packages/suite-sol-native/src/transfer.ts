import { SystemProgram } from '@solana/web3.js';
import { Pubkey, Secret } from '~/types/account';
import { Result, Try } from '~/shared';
import { TransactionBuilder } from '~/transaction-builder';
import { TransferOptions } from '~/types/sol-native';
import { CommonStructure } from '~/types/transaction-builder';

export namespace SolNative {
  const RADIX = 10;
  export const transfer = (
    source: Pubkey,
    dest: Pubkey,
    ownerOrMultisig: Secret[],
    amount: number,
    options: Partial<TransferOptions> = {},
  ): Result<CommonStructure, Error> => {
    return Try(() => {
      const inst = SystemProgram.transfer({
        fromPubkey: source.toPublicKey(),
        toPubkey: dest.toPublicKey(),
        lamports: parseInt(`${amount.toLamports()}`, RADIX),
      });

      const payer = options.feePayer
        ? options.feePayer.toKeypair()
        : ownerOrMultisig[0].toKeypair();

      return new TransactionBuilder.Common(
        [inst],
        ownerOrMultisig.map((s) => s.toKeypair()),
        payer,
      );
    });
  };
}
