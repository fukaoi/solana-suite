import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { OutputNftMetadata } from '@solana-suite/shared-metaplex';
export declare namespace Metaplex {
    const findByOwner: (owner: PublicKey) => Promise<Result<OutputNftMetadata[], Error>>;
}