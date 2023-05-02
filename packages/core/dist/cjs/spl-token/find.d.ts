import { Pubkey } from '@solana-suite/shared';
import { FindByOwnerCallback, Sortable } from '../types/spl-token';
import { UserSideInput, UserSideOutput } from '@solana-suite/shared-metaplex';
export declare namespace SplToken {
    const genericFindByOwner: <T extends UserSideOutput.NftMetadata | UserSideOutput.TokenMetadata>(owner: Pubkey, callback: FindByOwnerCallback, tokenStandard: UserSideInput.TokenStandard, sortable?: Sortable) => Promise<void>;
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
