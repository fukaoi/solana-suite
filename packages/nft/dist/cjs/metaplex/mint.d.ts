import { PublicKey, Keypair, TransactionInstruction } from '@solana/web3.js';
import { Instruction, Result } from '@solana-suite/shared';
import { InputMetaplexMetadata } from '../types/metaplex/index';
import { CreateNftBuilderParams } from '@metaplex-foundation/js';
import { BundlrSigner } from '../types';
import { IdentityClient } from '@metaplex-foundation/js/dist/types/plugins/identityModule';
export declare namespace Metaplex {
    const uploadMetaContent: (input: InputMetaplexMetadata, feePayer: BundlrSigner) => Promise<{
        uri: string;
        sellerFeeBasisPoints: number;
        reducedMetadata: {
            name: string;
            symbol: string;
            description?: string | undefined;
            external_url?: string | undefined;
            image?: string | undefined;
            attributes?: import("../types").JsonMetadataAttribute[] | undefined;
            properties?: import("../types").JsonMetadataProperties | undefined;
            isMutable?: boolean | undefined;
            maxSupply?: any;
            creators?: import("@metaplex-foundation/js").CreatorInput[] | undefined;
            uses?: import("@metaplex-foundation/js").Option<import("@metaplex-foundation/mpl-token-metadata").Uses> | undefined;
            isCollection?: boolean | undefined;
            collection?: import("@metaplex-foundation/js").Option<PublicKey> | undefined;
            collectionAuthority?: import("@metaplex-foundation/js").Option<import("@metaplex-foundation/js").Signer> | undefined;
            collectionAuthorityIsDelegated?: boolean | undefined;
            collectionIsSized?: boolean | undefined;
        };
    }>;
    const createNftBuilderInstruction: (feePayer: BundlrSigner, params: CreateNftBuilderParams, useNewMint: Keypair, updateAuthority: Keypair | IdentityClient, mintAuthority: Keypair | IdentityClient, tokenOwner: PublicKey) => Promise<TransactionInstruction[]>;
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
    const mint: (input: InputMetaplexMetadata, owner: Keypair, feePayer?: Keypair) => Promise<Result<Instruction, Error>>;
}
