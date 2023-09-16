import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { Pubkey } from '@solana-suite/shared';

export namespace Pda {
  export const getMetadata = (mint: Pubkey): PublicKey => {
    const [publicKey] = PublicKey.findProgramAddressSync(
      [Buffer.from('metadata'), PROGRAM_ID.toBuffer(), mint.toPublicKey().toBuffer()],
      PROGRAM_ID,
    );
    return publicKey;
  };

  export const getMasterEdition = (mint: Pubkey): PublicKey => {
    const [publicKey] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        PROGRAM_ID.toBuffer(),
        mint.toPublicKey().toBuffer(),
        Buffer.from('edition'),
      ],
      PROGRAM_ID,
    );
    return publicKey;
  };
}
