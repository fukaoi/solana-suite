import { PublicKey, Keypair } from "@solana/web3.js";
import { Metaplex as MetaplexFoundation } from "@metaplex-foundation/js";
import { Instruction, Result } from "@solana-suite/shared";
import { MetaplexMetadata, NftStorageMetaplexMetadata } from ".";
export declare namespace Metaplex {
    const init: (feePayer: Keypair) => MetaplexFoundation;
    /**
     * NFT mint
     *
     * @param {MetaplexMetadata}  input
     * {
     *   uri: {string}                 // basically storage uri
     *   name?: {string}               // NFT content name
     *   symbol?: {string}             // NFT ticker symbol
     *   sellerFeeBasisPoints?: number // Royalty percentage
     *   creators?: Creator[]          // Other creators than owner
     *   collection?: Collection       // collections of different colors, shapes, etc.
     *   uses?: Uses                   // Usage feature: Burn, Single, Multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: bignum            // mint copies
     *   mintAuthority?: Signer        // mint authority
     *   updateAuthority?: Signer      // update minted authority
     *   freezeAuthority?: PublicKey   // freeze minted authority
     * }
     * @param {PublicKey} owner        // PublicKey that Owns nft
     * @param {Keypair} feePayer       // fee payer
     * @return {Promise<Result<Instruction, Error>>}
     */
    const mint: (input: MetaplexMetadata, owner: PublicKey, feePayer: Keypair) => Promise<Result<Instruction, Error>>;
    /**
     * Upload content and NFT mint
     *
     * @param {NftStorageMetaplexMetadata}  input
     * {
     *   name?: {string}               // nft content name
     *   symbol?: {string}             // nft ticker symbol
     *   filePath?: {string | File}    // nft ticker symbol
     *   description?: {string}        // nft content description
     *   external_url?: {string}       // landing page, home page uri, related url
     *   sellerFeeBasisPoints?: number // royalty percentage
     *   attributes?: {JsonMetadataAttribute[]}     // game character parameter, personality, characteristics
     *   properties?: {JsonMetadataProperties<Uri>} // include file name, uri, supported file type
     *   collection?: Collection                    // collections of different colors, shapes, etc.
     *   [key: string]: {unknown}                   // optional param, Usually not used.
     *   creators?: Creator[]          // other creators than owner
     *   uses?: Uses                   // usage feature: burn, single, multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: bignum            // mint copies
     *   mintAuthority?: Signer        // mint authority
     *   updateAuthority?: Signer      // update minted authority
     *   freezeAuthority?: PublicKey   // freeze minted authority
     * }
     * @param {Keypair} feePayer       // fee payer
     * @return Promise<Result<Instruction, Error>>
     */
    const uploadContentMint: (input: NftStorageMetaplexMetadata, owner: PublicKey, feePayer: Keypair) => Promise<Result<Instruction, Error>>;
}
