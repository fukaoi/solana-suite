import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';

export namespace Pda {
  export const getMetadata = (mint: PublicKey): PublicKey => {
    const [publicKey] = PublicKey.findProgramAddressSync(
      [Buffer.from('metadata'), PROGRAM_ID.toBuffer(), mint.toBuffer()],
      PROGRAM_ID
    );
    return publicKey;
  };

  export const getMasterEdition = (mint: PublicKey): PublicKey => {
    const [publicKey] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from('edition'),
      ],
      PROGRAM_ID
    );
    return publicKey;
  };
}
