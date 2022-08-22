export * from './internal/_mint';
export * from './royalty';
import { CreateNftInput } from '@metaplex-foundation/js';
import { PublicKey, Keypair } from '@solana/web3.js';
import { NftStorageMetadata } from '../storage';
import { Instruction, Result } from '@solana-suite/shared';
import { ValidatorError } from '../validator';
declare type noNeedOptional = 'payer' | 'owner' | 'associatedTokenProgram' | 'tokenProgram' | 'confirmOptions';
export declare type MetaplexMetaData = Omit<CreateNftInput, noNeedOptional>;
export declare type NftStorageMetaplexMetadata = Omit<NftStorageMetadata, 'seller_fee_basis_points'> & Omit<MetaplexMetaData, 'uri' | 'sellerFeeBasisPoints'> & {
    name: string;
    symbol: string;
    royalty: number;
    filePath: string | File;
    storageType: 'arweave' | 'nftStorage';
};
export declare namespace Metaplex {
    /**
     * Upload content and NFT mint
     *
     * @param {NftStorageMetaplexMetadata}  metadata
     * {
     *   name: string               // nft content name
     *   symbol: string             // nft ticker symbol
     *   filePath: string | File    // nft ticker symbol
     *   royalty: number            // royalty percentage
     *   description?: string       // nft content description
     *   external_url?: string      // landing page, home page uri, related url
     *   attributes?: JsonMetadataAttribute[]     // game character parameter, personality, characteristics
     *   properties?: JsonMetadataProperties<Uri> // include file name, uri, supported file type
     *   collection?: Collection                  // collections of different colors, shapes, etc.
     *   [key: string]: unknown                   // optional param, Usually not used.
     *   creators?: Creator[]          // other creators than owner
     *   uses?: Uses                   // usage feature: burn, single, multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     *   mintAuthority?: Signer        // mint authority
     *   updateAuthority?: Signer      // update minted authority
     *   freezeAuthority?: PublicKey   // freeze minted authority
     * }
     * @param {PublicKey} owner        // first minted owner
     * @param {Keypair} feePayer       // fee payer
     * @return Promise<Result<Instruction, Error>>
     */
    const mint: (metadata: NftStorageMetaplexMetadata, owner: PublicKey, feePayer: Keypair) => Promise<Result<Instruction, Error | ValidatorError>>;
}
