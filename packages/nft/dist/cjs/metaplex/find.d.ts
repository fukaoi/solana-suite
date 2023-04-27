import { Pubkey, Result } from '@solana-suite/shared';
export declare namespace Metaplex {
    /**
     * Fetch minted metadata by owner Pubkey
     *
     * @param {Pubkey} owner
     * @return Promise<Result<OutputNftMetadata[], Error>>
     */
    const findByOwner2: (owner: Pubkey) => Promise<Result<void, Error>>;
}
