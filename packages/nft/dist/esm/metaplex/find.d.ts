import { Pubkey, Result } from '@solana-suite/shared';
import { UserSideOutput } from '@solana-suite/shared-metaplex';
import { Sortable } from '@solana-suite/core';
export declare namespace Metaplex {
    /**
     * Fetch minted metadata by owner Pubkey
     *
     * @param {Pubkey} owner
     * @param {Sortable} callback
     * @param {Sortable} sortable?
     * @return Promise<Result<never, Error>>
     */
    const findByOwner: (owner: Pubkey, callback: (result: Result<UserSideOutput.NftMetadata[], Error>) => void, sortable?: Sortable) => Promise<void>;
}
