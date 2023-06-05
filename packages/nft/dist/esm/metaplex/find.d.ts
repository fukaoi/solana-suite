import { Pubkey, Result } from '@solana-suite/shared';
import { UserSideOutput } from '@solana-suite/shared-metaplex';
import { Find, OnErr, OnOk, Sortable } from '@solana-suite/core';
export declare namespace Metaplex {
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
    }) => Promise<void>;
    /**
     * Fetch minted metadata by mint address
     *
     * @param {Pubkey} mint
     * @return Promise<Result<UserSideOutput.NftMetadata, Error>>
     */
    const findByMint: (mint: Pubkey) => Promise<Result<UserSideOutput.TokenMetadata, Error>>;
}
//# sourceMappingURL=find.d.ts.map