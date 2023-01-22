import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { OutputMetaplexMetadata } from '../types/metaplex/find';
export declare namespace Metaplex {
    const findByOwner: (owner: PublicKey) => Promise<Result<OutputMetaplexMetadata[], Error>>;
}
