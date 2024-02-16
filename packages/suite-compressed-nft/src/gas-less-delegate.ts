import { Pubkey, Secret } from '~/types/account';
import { CompressedNft as Delegate } from './delegate';
import { Node } from '~/node';
import { Transaction } from '@solana/web3.js';
import { TransactionBuilder } from '~/transaction-builder';
import { Result, Try } from '~/suite-utils';
import { PartialSignStructure } from '~/types/transaction-builder';
import { GassLessDelegateOptions } from '~/types/compressed-nft';

export namespace CompressedNft {
  /**
   * Create delegate with gas-less
   * @param {Pubkey} mint
   * @param {Secret} owner
   * @param {Pubkey} newDelegate
   * @param {Partial<GassLessDelegateOptions> } options
   * @return {Promise<Result<PartialSignTransaction, Error>>}
   */
  export const gasLessDelegate = async (
    mint: Pubkey,
    owner: Secret,
    newDelegate: Pubkey,
    options: Partial<GassLessDelegateOptions> = {},
  ): Promise<Result<PartialSignStructure, Error>> => {
    return Try(async () => {
      const inst = await Delegate.createDeleagate(
        mint.toPublicKey(),
        newDelegate.toPublicKey(),
      );

      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: newDelegate.toPublicKey(),
      });
      tx.add(inst);

      if (options.isPriorityFee) {
        tx.add(
          await TransactionBuilder.PriorityFee.createPriorityFeeInstruction(tx),
        );
      }

      tx.partialSign(owner.toKeypair());
      tx.recentBlockhash = blockhashObj.blockhash;

      return new TransactionBuilder.PartialSign(
        tx
          .serialize({
            requireAllSignatures: false,
          })
          .toString('hex'),
      );
    });
  };
}
