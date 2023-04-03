import { PublicKey } from '@solana/web3.js';
export declare namespace Pda {
    const getMetadata: (mint: PublicKey) => PublicKey;
    const getMasterEdition: (mint: PublicKey) => PublicKey;
}
