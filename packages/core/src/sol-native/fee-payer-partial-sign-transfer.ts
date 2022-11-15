import {
  PublicKey,
  SystemProgram,
  Keypair,
  Transaction,
} from '@solana/web3.js';

import {
  Result,
  Node,
  PartialSignInstruction,
  Try,
} from '@solana-suite/shared';

export namespace SolNative {
  const RADIX = 10;
  export const feePayerPartialSignTransfer = async (
    owner: PublicKey,
    dest: PublicKey,
    signers: Keypair[],
    amount: number,
    feePayer: PublicKey
  ): Promise<Result<PartialSignInstruction, Error>> => {
    return Try(async () => {
      const blockHashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new Transaction({
        blockhash: blockHashObj.blockhash,
        lastValidBlockHeight: blockHashObj.lastValidBlockHeight,
        feePayer,
      }).add(
        SystemProgram.transfer({
          fromPubkey: owner,
          toPubkey: dest,
          lamports: parseInt(`${amount.toLamports()}`, RADIX),
        })
      );

      signers.forEach((signer) => {
        tx.partialSign(signer);
      });

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new PartialSignInstruction(hex);
    });
  };
}
