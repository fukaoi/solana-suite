import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { Account } from '~/account';
import { Pubkey, Secret } from '~/types/account';
import { TransactionBuilder } from '~/transaction-builder';
import { Transaction } from '@solana/web3.js';
import { CompressedNft as Transfer } from './transfer';
import { CompressedNft as Delegate } from './gas-less-delegate';
import { PartialSignStructure } from '~/types/transaction-builder';

export namespace CompressedNft {
  /**
   * Transfer with gas-less
   * @param {Pubkey} mint
   * @param {Secret} signer
   * @param {Pubkey} dest
   * @param {Pubkey} feePayer
   * @returns {Promise<Result<PartialSignTransaction[], Error>>}
   */
  export const gasLessTransfer = async (
    mint: Pubkey,
    signer: Secret,
    dest: Pubkey,
    feePayer: Pubkey,
  ): Promise<Result<PartialSignStructure, Error>[]> => {
    const delegate = await Delegate.gasLessDelegate(
      mint,
      signer,
      feePayer,
    );
    delegate.unwrap().canSubmit = true;

    const transfer = await Try(async () => {
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const inst = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey(),
      });

      const assetIdOwnerKeypair = new Account.Keypair({ secret: signer });
      inst.add(
        await Transfer.createTransfer(
          mint,
          assetIdOwnerKeypair.pubkey,
          dest,
          feePayer,
        ),
      );
      inst.recentBlockhash = blockhashObj.blockhash;

      return new TransactionBuilder.PartialSign(
        inst
          .serialize({
            requireAllSignatures: false,
          })
          .toString('hex'),
      );
    });
    return [delegate, transfer];
  };
}
