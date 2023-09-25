import { PublicKey } from '@solana/web3.js';
import { Pubkey } from '@solana-suite/shared';

declare namespace Pda {
    const getMetadata: (mint: Pubkey) => PublicKey;
    const getMasterEdition: (mint: Pubkey) => PublicKey;
}

export { Pda };
