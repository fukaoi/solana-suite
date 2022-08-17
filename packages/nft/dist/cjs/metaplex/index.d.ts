export * from './metadata';
export * from './royalty';
import { CreateNftInput } from '@metaplex-foundation/js';
import { PublicKey, Keypair } from '@solana/web3.js';
import { NftStorageMetadata } from '../storage';
import { Instruction, Result } from '@solana-suite/shared';
declare type noNeedOptional = 'payer' | 'owner' | 'associatedTokenProgram' | 'tokenProgram' | 'confirmOptions';
export declare type MetaplexMetadata = Omit<CreateNftInput, noNeedOptional>;
export declare type NftStorageMetaplexMetadata = NftStorageMetadata & Omit<MetaplexMetadata, 'uri'> & {
    filePath: string | File;
    storageType: 'arweave' | 'nftStorage';
};
export declare namespace Metaplex {
    /**
     * Upload content and NFT mint
     *
     * @param {NftStorageMetaplexMetadata}  metadata
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
     *   maxSupply?: BigNumber         // mint copies
     *   mintAuthority?: Signer        // mint authority
     *   updateAuthority?: Signer      // update minted authority
     *   freezeAuthority?: PublicKey   // freeze minted authority
     * }
     * @param {Keypair} feePayer       // fee payer
     * @return Promise<Result<Instruction, Error>>
     */
    const mint: (metadata: NftStorageMetaplexMetadata, owner: PublicKey, feePayer: Keypair) => Promise<Result<Instruction, Error>>;
}
