import { Pubkey, Result } from '@solana-suite/shared';
import { OutputNftMetadata } from '@solana-suite/shared-metaplex';
export declare namespace Metaplex {
    const findByOwner: (owner: Pubkey) => Promise<Result<OutputNftMetadata[], Error>>;
    const findByOwner2: (owner: Pubkey) => Promise<Result<void, Error>>;
}
