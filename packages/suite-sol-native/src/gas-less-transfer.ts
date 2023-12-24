import { SystemProgram, Transaction } from '@solana/web3.js';
import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { TransactionBuilder } from '~/transaction-builder';
import { Pubkey, Secret } from '~/types/account';
import { PartialSignStructure } from '~/types/transaction-builder';

export namespace SolNative {
  const RADIX = 10;

  /**
   * Transfer without solana sol, delegate feepayer for commission
   *
   * @param {Secret} owner
   * @param {Pubkey} dest
   * @param {number} amount
   * @param {Pubkey} feePayer
   * @return Promise<Result<PartialSignStructure, Error>>
   */
  export const gasLessTransfer = async (
    owner: Secret,
    dest: Pubkey,
    amount: number,
    feePayer: Pubkey,
  ): Promise<Result<PartialSignStructure, Error>> => {
    return Try(async () => {
      const blockHashObj = await Node.getConnection().getLatestBlockhash();
      const ownerPublicKey = owner.toKeypair().publicKey;
      const tx = new Transaction({
        blockhash: blockHashObj.blockhash,
        lastValidBlockHeight: blockHashObj.lastValidBlockHeight,
        feePayer: feePayer.toPublicKey(),
      }).add(
        SystemProgram.transfer({
          fromPubkey: ownerPublicKey,
          toPubkey: dest.toPublicKey(),
          lamports: parseInt(`${amount.toLamports()}`, RADIX),
        }),
      );

      tx.partialSign(owner.toKeypair());

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new TransactionBuilder.PartialSign(hex);
    });
  };
}
