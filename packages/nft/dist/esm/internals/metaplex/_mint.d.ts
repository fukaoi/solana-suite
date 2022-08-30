import { PublicKey, Keypair } from '@solana/web3.js';
import { Instruction, Result } from '@solana-suite/shared';
import { MetaplexMetaData } from '../../types/metaplex/index';
import { ValidatorError } from '../../validator';
export declare namespace InternalsMetaplex_Mint {
    /**
     * NFT mint
     *
     * @param {MetaplexMetaData}  metadata
     * {
     *   uri: string                   // basically storage uri
     *   name: string                  // NFT content name
     *   symbol: string                // NFT ticker symbol
     *   sellerFeeBasisPoints number   // Royalty percentage
     *   creators?: Creator[]          // Other creators than owner
     *   collection?: Collection       // collections of different colors, shapes, etc.
     *   uses?: Uses                   // Usage feature: Burn, Single, Multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     *   mintAuthority?: Keypair       // mint authority
     *   updateAuthority?: Keypair     // update minted authority
     *   freezeAuthority?: PublicKey   // freeze minted authority
     * }
     * @param {PublicKey} owner        // PublicKey that Owns nft
     * @param {Keypair} feePayer       // fee payer
     * @return {Promise<Result<Instruction, Error | ValidatorError>>}
     */
    const create: (metadata: MetaplexMetaData, owner: PublicKey, feePayer: Keypair) => Promise<Result<Instruction, Error | ValidatorError>>;
}
