import { PublicKey, Keypair, TransactionInstruction } from '@solana/web3.js';
import { Result, MintInstruction } from '@solana-suite/shared';
import { BundlrSigner, InputNftMetadata } from '@solana-suite/shared-metaplex';
import { CreateNftBuilderParams } from '@metaplex-foundation/js';
import { IdentityClient } from '@metaplex-foundation/js/dist/types/plugins/identityModule';
export declare namespace Metaplex {
    const createNftBuilderInstruction: (feePayer: BundlrSigner, params: CreateNftBuilderParams, useNewMint: Keypair, updateAuthority: Keypair | IdentityClient, mintAuthority: Keypair | IdentityClient, tokenOwner: PublicKey) => Promise<TransactionInstruction[]>;
    /**
     * Upload content and NFT mint
     *
     * @param {NftMetadata}  input
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
    const mint: (input: InputNftMetadata, owner: Keypair, feePayer?: Keypair) => Promise<Result<MintInstruction, Error>>;
}
