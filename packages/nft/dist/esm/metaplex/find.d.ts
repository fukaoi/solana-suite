import { Pubkey, Result } from '@solana-suite/shared';
import { UserSideOutput } from '@solana-suite/shared-metaplex';
export declare namespace Metaplex {
    /**
     * Fetch minted metadata by owner Pubkey
     *
     * @param {Pubkey} owner
     * @return Promise<Result<OutputNftMetadata[], Error>>
     */
    const findByOwner: (owner: Pubkey) => Promise<Result<UserSideOutput.NftMetadata[], Error>>;
    const findByOwner2: (owner: Pubkey) => Promise<Result<void, Error>>;
}
