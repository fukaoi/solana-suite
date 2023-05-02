import { Pubkey } from '@solana-suite/shared';
import { FindByOwnerCallback, Sortable } from '@solana-suite/core';
export declare namespace Metaplex {
    /**
     * Fetch minted metadata by owner Pubkey
     *
     * @param {Pubkey} owner
     * @param {Sortable} callback
     * @param {Sortable} sortable?
     * @return Promise<Result<never, Error>>
     */
    const findByOwner: (owner: Pubkey, callback: FindByOwnerCallback, sortable?: Sortable) => Promise<void>;
}
