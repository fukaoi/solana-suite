import { SystemProgram, Transaction } from '@solana/web3.js';

import {
  Result,
  Node,
  PartialSignInstruction,
  Try,
  Pubkey,
  Secret,
} from '@solana-suite/shared';

export namespace SolNative {
  const RADIX = 10;
  export const feePayerPartialSignTransfer = async (
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    amount: number,
    feePayer: Pubkey
  ): Promise<Result<PartialSignInstruction, Error>> => {
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
        })
      );

      signers.forEach((signer) => {
        tx.partialSign(signer.toKeypair());
      });

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new PartialSignInstruction(hex);
    });
  };
}
