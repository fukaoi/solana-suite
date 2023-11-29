import { Pubkey, Secret } from '~/types/account';
import { CompressedNft as Delegate } from './delegate';
import { Node } from '~/node';
import { Transaction } from '@solana/web3.js';
import { PartialSignTransaction } from '~/transaction';
import { Result, Try } from '~/shared';

export namespace CompressedNft {
  export const gasLessDelegate = async (
    assetId: Pubkey,
    assetOwner: Secret,
    newDelegate: Pubkey,
  ): Promise<Result<PartialSignTransaction, Error>> => {
    return Try(async () => {
      const inst = await Delegate.createDeleagate(
        assetId.toPublicKey(),
        newDelegate.toPublicKey(),
      );

      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: newDelegate.toPublicKey(),
      });
      tx.add(inst);
      tx.partialSign(assetOwner.toKeypair());
      tx.recentBlockhash = blockhashObj.blockhash;

      return new PartialSignTransaction(
        tx
          .serialize({
            requireAllSignatures: false,
          })
          .toString('hex'),
      );
    });
  };
}
