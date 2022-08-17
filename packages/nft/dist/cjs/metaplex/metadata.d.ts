import { PublicKey, Keypair } from '@solana/web3.js';
import { Instruction, Result } from '@solana-suite/shared';
import { MetaplexMetadata as Metadata } from './index';
export declare namespace MetaplexMetadata {
    /**
     * NFT mint
     *
     * @param {MetaplexMetadata}  metadata
     * {
     *   uri: {string}                 // basically storage uri
     *   name?: {string}               // NFT content name
     *   symbol?: {string}             // NFT ticker symbol
     *   sellerFeeBasisPoints?: number // Royalty percentage
     *   creators?: Creator[]          // Other creators than owner
     *   collection?: Collection       // collections of different colors, shapes, etc.
     *   uses?: Uses                   // Usage feature: Burn, Single, Multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     *   mintAuthority?: Signer        // mint authority
     *   updateAuthority?: Signer      // update minted authority
     *   freezeAuthority?: PublicKey   // freeze minted authority
     * }
     * @param {PublicKey} owner        // PublicKey that Owns nft
     * @param {Keypair} feePayer       // fee payer
     * @return {Promise<Result<Instruction, Error>>}
     */
    const create: (metadata: Metadata, owner: PublicKey, feePayer: Keypair) => Promise<Result<Instruction, Error>>;
}
