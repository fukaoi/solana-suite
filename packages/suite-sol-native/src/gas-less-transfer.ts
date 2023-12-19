import { SystemProgram, Transaction } from '@solana/web3.js';
import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { TransactionBuilder } from '~/transaction-builder';
import { Pubkey, Secret } from '~/types/account';
import { PartialSignStructure } from '~/types/transaction-builder';

export namespace SolNative {
  const RADIX = 10;
  export const gasLessTransfer = async (
    owner: Pubkey,
    dest: Pubkey,
    ownerOrMultisigi: Secret[],
    amount: number,
    feePayer: Pubkey,
  ): Promise<Result<PartialSignStructure, Error>> => {
    return Try(async () => {
      const blockHashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new Transaction({
        blockhash: blockHashObj.blockhash,
        lastValidBlockHeight: blockHashObj.lastValidBlockHeight,
        feePayer: feePayer.toPublicKey(),
      }).add(
        SystemProgram.transfer({
          fromPubkey: owner.toPublicKey(),
          toPubkey: dest.toPublicKey(),
          lamports: parseInt(`${amount.toLamports()}`, RADIX),
        }),
      );

      ownerOrMultisigi.forEach((signer) => {
        tx.partialSign(signer.toKeypair());
      });

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new TransactionBuilder.PartialSign(hex);
    });
  };
}
