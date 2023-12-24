import { SystemProgram } from '@solana/web3.js';
import { Pubkey, Secret } from '~/types/account';
import { Result, Try } from '~/shared';
import { TransactionBuilder } from '~/transaction-builder';
import { TransferOptions } from '~/types/sol-native';
import { CommonStructure } from '~/types/transaction-builder';

export namespace SolNative {
  const RADIX = 10;

  /**
   * Transfer NFT for only multiSig account
   *
   * @param {Pubkey} owner              // current multisig owner
   * @param {Pubkey} dest               // new owner
   * @param {Secret[]} ownerOrMultisig  // owner or multisig account Secret
   * @param {number} amount             // want to transfer SOL amount
   * @param {Partial<TransferOptions>} options       // options
   * @return {Result<CommonStructure<unknown>, Error> }
   */
  export const transfer = (
    owner: Pubkey,
    dest: Pubkey,
    ownerOrMultisig: Secret[],
    amount: number,
    options: Partial<TransferOptions> = {},
  ): Result<CommonStructure, Error> => {
    return Try(() => {
      const inst = SystemProgram.transfer({
        fromPubkey: owner.toPublicKey(),
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
