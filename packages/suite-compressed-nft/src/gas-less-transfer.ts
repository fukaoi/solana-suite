import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { Account } from '~/account';
import { Pubkey, Secret } from '~/types/account';
import { PartialSignTransaction } from '~/transaction';
import { Transaction } from '@solana/web3.js';
import { CompressedNft as Transfer } from './transfer';
import { CompressedNft as Delegate } from './gas-less-delegate';

export namespace CompressedNft {
  /**
   * Transfer with gas-less
   * @param {Pubkey} assetId
   * @param {Secret} assetIdOwner
   * @param {Pubkey} dest
   * @param {Pubkey} feePayer
   * @returns {Promise<Result<PartialSignTransaction[], Error>>}
   */
  export const gasLessTransfer = async (
    assetId: Pubkey,
    assetIdOwner: Secret,
    dest: Pubkey,
    feePayer: Pubkey,
  ): Promise<Result<PartialSignTransaction[], Error>> => {
    return Try(async () => {
      const delegate = await Delegate.gasLessDelegate(
        assetId,
        assetIdOwner,
        feePayer,
      );
      if (delegate.isErr) {
        throw delegate.error;
      }
      const first = delegate.value;
      first.canSubmit = true;
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const inst = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey(),
      });

      const assetIdOwnerKeypair = new Account.Keypair({ secret: assetIdOwner });
      inst.add(
        await Transfer.createTransfer(
          assetId,
          assetIdOwnerKeypair.pubkey,
          dest,
          feePayer
        ),
      );
      inst.recentBlockhash = blockhashObj.blockhash;

      const second = new PartialSignTransaction(
        inst
          .serialize({
            requireAllSignatures: false,
          })
          .toString('hex'),
      );
      return [first, second];
    });
  };
}
