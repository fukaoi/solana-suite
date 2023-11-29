import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { Pubkey } from '~/types/account';
import { PartialSignTransaction } from '~/transaction';
import { Transaction } from '@solana/web3.js';
import { CompressedNft as Transfer } from './transfer';

export namespace CompressedNft {
  export const gasLessTransfer = async (
    assetId: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    feePayer: Pubkey,
  ): Promise<Result<PartialSignTransaction[], Error>> => {
    return Try(async () => {
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const inst = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey(),
      });

      inst.add(await Transfer.createTransfer(assetId, owner, dest, feePayer));

      inst.recentBlockhash = blockhashObj.blockhash;

      const secondTransaction = new PartialSignTransaction(
        inst
          .serialize({
            requireAllSignatures: false,
          })
          .toString('hex'),
      );
      return [secondTransaction];
    });
  };
}
