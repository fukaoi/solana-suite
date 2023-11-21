import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { Pubkey, Secret } from '~/types/account';
import { PartialSignTransaction } from '~/transaction';
import { Transaction } from '@solana/web3.js';
import { CompressedNft as Transfer } from './transfer';

export namespace ComppressedNft {
  export const feeLessTransfer = async (
    assetId: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    feePayer: Pubkey,
  ): Promise<Result<PartialSignTransaction, Error>> => {
    return Try(async () => {
      const inst = await Transfer.createTransferInstruction(
        assetId,
        owner,
        dest,
      );
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey(),
      });

      tx.add(inst);
      tx.recentBlockhash = blockhashObj.blockhash;
      const keypairs = signers.map((s) => s.toKeypair());

      keypairs.forEach((signer) => {
        tx.partialSign(signer);
      });

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new PartialSignTransaction(hex);
    });
  };
}
