import { Keypair } from '@solana/web3.js';
import { Instruction, Result } from '@solana-suite/shared';
import { ValidatorError } from '../validator';
import { InputMetaplexMetadata } from '../types/metaplex/index';
import { NftStorageMetadata } from '../types';
export declare namespace Metaplex {
    const initNftStorageMetadata: (input: InputMetaplexMetadata, sellerFeeBasisPoints: number) => NftStorageMetadata;
    /**
     * Upload content and NFT mint
     *
     * @param {InputMetaplexMetadata}  input
     * {
     *   name: string               // nft content name
     *   symbol: string             // nft ticker symbol
     *   filePath: string | File    // nft ticker symbol
     *   royalty: number            // royalty percentage
     *   storageType: 'arweave'|'nftStorage' // royalty percentage
     *   description?: string       // nft content description
     *   external_url?: string      // landing page, home page uri, related url
     *   attributes?: JsonMetadataAttribute[]     // game character parameter, personality, characteristics
     *   properties?: JsonMetadataProperties<Uri> // include file name, uri, supported file type
     *   collection?: Collection                  // collections of different colors, shapes, etc.
     *   [key: string]?: unknown                   // optional param, Usually not used.
     *   creators?: Creator[]          // other creators than owner
     *   uses?: Uses                   // usage feature: burn, single, multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     * }
     * @param {Keypair} owner          // first minted owner
     * @param {Keypair} feePayer       // fee payer
     * @return Promise<Result<Instruction, Error>>
     */
    const mint: (input: InputMetaplexMetadata, owner: Keypair, feePayer?: Keypair) => Promise<Result<Instruction, Error | ValidatorError>>;
}
