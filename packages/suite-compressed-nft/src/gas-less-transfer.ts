import { Account, Result, Try } from '~/shared';
import { Node } from '~/node';
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
   * @param {Secret} owner
   * @param {Pubkey} dest
   * @param {Pubkey} feePayer
   * @returns {Promise<Result<PartialSignTransaction[], Error>>}
   */
  export const gasLessTransfer = async (
    mint: Pubkey,
    owner: Secret,
    dest: Pubkey,
    feePayer: Pubkey,
  ): Promise<Result<PartialSignStructure, Error>[]> => {
    const delegate = await Delegate.gasLessDelegate(mint, owner, feePayer);
    delegate.unwrap().canSubmit = true;

    const transfer = await Try(async () => {
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const inst = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey(),
      });

      inst.add(
        await Transfer.createTransfer(
          mint,
          new Account.Keypair({ secret: owner }).pubkey,
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
