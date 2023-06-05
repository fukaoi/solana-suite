import { Pubkey, Result } from '@solana-suite/shared';
import { Find, OnErr, OnOk, Sortable } from '../types/';
import { UserSideInput, UserSideOutput } from '@solana-suite/shared-metaplex';
export declare namespace SplToken {
    const genericFindByOwner: <T extends UserSideOutput.TokenMetadata | UserSideOutput.NftMetadata>(owner: Pubkey, callback: (result: Result<T[], Error>) => void, tokenStandard: UserSideInput.TokenStandard, sortable?: Sortable, isHolder?: boolean) => Promise<void>;
    const genericFindByMint: <T extends UserSideOutput.TokenMetadata | UserSideOutput.NftMetadata>(mint: Pubkey, tokenStandard: UserSideInput.TokenStandard) => Promise<Result<UserSideOutput.TokenMetadata, Error>>;
    /**
     * Fetch minted metadata by owner Pubkey
     *
     * @param {Pubkey} owner
     * @param {OnOk} onOk callback function
     * @param {OnErr} onErr callback function
     * @param {{sortable?: Sortable, isHolder?: boolean}} options?
     * @return Promise<void>
     */
    const findByOwner: (owner: Pubkey, onOk: OnOk<Find>, onErr: OnErr, options?: {
        sortable?: Sortable;
        isHolder?: boolean;
    }) => void;
    /**
     * Fetch minted metadata by mint address
     *
     * @param {Pubkey} mint
     * @return Promise<Result<UserSideOutput.TokenMetadata, Error>>
     */
    const findByMint: (mint: Pubkey) => Promise<Result<UserSideOutput.TokenMetadata, Error>>;
}
//# sourceMappingURL=find.d.ts.map