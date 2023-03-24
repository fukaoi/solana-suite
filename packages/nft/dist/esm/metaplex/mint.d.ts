import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import { Result, MintInstruction, Secret, Pubkey } from '@solana-suite/shared';
import { InputNftMetadata } from '@solana-suite/shared-metaplex';
import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
export declare namespace Metaplex {
    const createMintInstructions: (mint: PublicKey, owner: PublicKey, nftMetadata: DataV2, feePayer: PublicKey, isMutable: boolean) => Promise<TransactionInstruction[]>;
    /**
     * Upload content and NFT mint
     *
     * @param {Pubkey} owner          // first minted owner
     * @param {Secret} signer         // owner's Secret
     * @param {NftMetadata}  input
     * {
     *   name: string               // nft content name
     *   symbol: string             // nft ticker symbol
     *   filePath: string | File    // nft ticker symbol
     *   royalty: number            // royalty percentage
     *   storageType: 'arweave'|'nftStorage' // royalty percentage
     *   description?: string       // nft content description
     *   external_url?: string      // landing page, home page uri, related url
     *   attributes?: MetadataAttribute[]     // game character parameter, personality, characteristics
     *   properties?: MetadataProperties<Uri> // include file name, uri, supported file type
     *   collection?: Pubkey           // collections of different colors, shapes, etc.
     *   [key: string]?: unknown       // optional param, Usually not used.
     *   creators?: InputCreators[]          // other creators than owner
     *   uses?: Uses                   // usage feature: burn, single, multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     * }
     * @param {Secret} feePayer?       // fee payer
     * @return Promise<Result<Instruction, Error>>
     */
    const mint: (owner: Pubkey, signer: Secret, input: InputNftMetadata, feePayer?: Pubkey) => Promise<Result<MintInstruction, Error>>;
}
