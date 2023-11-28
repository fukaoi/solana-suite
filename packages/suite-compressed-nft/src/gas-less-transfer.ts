import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { Pubkey } from '~/types/account';
import { PartialSignTransaction } from '~/transaction';
import { Transaction } from '@solana/web3.js';
import { CompressedNft as Transfer } from './transfer';
import { CompressedNft as Delegate } from './delegate';

export namespace CompressedNft {
  export const gasLessTransfer = async (
    assetId: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    feePayer: Pubkey,
  ): Promise<Result<PartialSignTransaction[], Error>> => {
    return Try(async () => {
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const first = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey(),
      });

      const second = first;

      first.add(
        await Delegate.createDeleagate(
          assetId.toPublicKey(),
          feePayer.toPublicKey(),
        ),
      );

      // BUG:  Missing signing
      second.add(await Transfer.createTransfer(assetId, owner, dest, feePayer));

      first.recentBlockhash = blockhashObj.blockhash;
      second.recentBlockhash = blockhashObj.blockhash;

      const firstTransaction = new PartialSignTransaction(
        first
          .serialize({
            requireAllSignatures: false,
          })
          .toString('hex'),
      );
      const secondTransaction = new PartialSignTransaction(
        second
          .serialize({
            requireAllSignatures: false,
          })
          .toString('hex'),
      );
      return [firstTransaction, secondTransaction];
    });
  };
}
