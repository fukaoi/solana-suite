import { Pubkey, Result } from '@solana-suite/shared';
import { Sortable } from '../types/spl-token';
import { UserSideInput, UserSideOutput } from '@solana-suite/shared-metaplex';
export declare namespace SplToken {
    const genericFindByOwner: <T extends UserSideOutput.NftMetadata | UserSideOutput.TokenMetadata>(owner: Pubkey, callback: (result: Result<T[], Error>) => void, tokenStandard: UserSideInput.TokenStandard, sortable?: Sortable) => Promise<void>;
    /**
     * Fetch minted metadata by owner Pubkey
     *
     * @param {Pubkey} owner
     * @param {FindByOwnerCallback} callback
     * @param {Sortable} sortable?
     * @return Promise<Result<never, Error>>
     */
    const findByOwner: (owner: Pubkey, callback: (result: Result<UserSideOutput.TokenMetadata[], Error>) => void, sortable?: Sortable) => Promise<void>;
}
