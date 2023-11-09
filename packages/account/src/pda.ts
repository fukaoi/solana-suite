import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { Pubkey } from '~/types/account';
import { MPL_BUBBLEGUM_PROGRAM_ID } from '@metaplex-foundation/mpl-bubblegum';

export namespace Account {
  export namespace Pda {
    export const getMetadata = (address: Pubkey): PublicKey => {
      const [publicKey] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          PROGRAM_ID.toBuffer(),
          address.toPublicKey().toBuffer(),
        ],
        PROGRAM_ID,
      );
      return publicKey;
    };

    export const getMasterEdition = (address: Pubkey): PublicKey => {
      const [publicKey] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          PROGRAM_ID.toBuffer(),
          address.toPublicKey().toBuffer(),
          Buffer.from('edition'),
        ],
        PROGRAM_ID,
      );
      return publicKey;
    };

    export const getTreeAuthority = (address: Pubkey): PublicKey => {
      const [publicKey] = PublicKey.findProgramAddressSync(
        [address.toPublicKey().toBuffer()],
        MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey(),
      );
      return publicKey;
    };

    export const getBgumSigner = (): PublicKey => {
      const [publicKey] = PublicKey.findProgramAddressSync(
        [Buffer.from('collection_cpi', 'utf8')],
        MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey(),
      );
      return publicKey;
    };
  }
}
