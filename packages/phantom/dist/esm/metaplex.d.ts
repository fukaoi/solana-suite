/// <reference types="@solana/web3.js" />
import { InputMetaplexMetadata, Phantom } from '@solana-suite/nft';
import { Result } from '@solana-suite/shared';
import { CreateNftBuilderParams } from '@metaplex-foundation/js';
export declare namespace Metaplex {
    const createNftBuilder: (params: CreateNftBuilderParams, feePayer: Phantom) => Promise<import("@solana/web3.js").TransactionInstruction[]>;
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
    const mint: (input: InputMetaplexMetadata, phantom: Phantom) => Promise<Result.Ok<string, Error> | Result.Err<string, Error> | Result.Ok<never, any> | Result.Err<never, any>>;
}
