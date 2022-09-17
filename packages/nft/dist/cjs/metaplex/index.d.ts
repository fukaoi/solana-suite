/// <reference types="@solana/web3.js" />
export declare const Metaplex: {
    transfer: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, dest: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Keypair[], feePayer?: import("@solana/web3.js").Keypair | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    feePayerPartialSignTransferNft: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, dest: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Keypair[], feePayer: import("@solana/web3.js").PublicKey) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").PartialSignInstruction, Error>>;
    findByOwner: (owner: import("@solana/web3.js").PublicKey) => Promise<import("@solana-suite/shared").Result<import("..").OutputMetaplexMetadata[], Error>>;
    createNftBuilderInstruction: (feePayer: import("..").BundlrSigner, params: import("@metaplex-foundation/js").CreateNftBuilderParams, useNewMint: import("@solana/web3.js").Keypair, updateAuthority: import("@solana/web3.js").Keypair, mintAuthority: import("@solana/web3.js").Keypair, tokenOwner: import("@solana/web3.js").PublicKey) => Promise<import("@solana/web3.js").TransactionInstruction[]>;
    initNftStorageMetadata: (input: import("..").InputMetaplexMetadata, sellerFeeBasisPoints: number, options?: any) => import("..").NftStorageMetadata;
    uploadMetaContent: (input: import("..").InputMetaplexMetadata, feePayer: import("..").BundlrSigner) => Promise<import("@solana-suite/shared").Result.Ok<{
        uri: string;
        sellerFeeBasisPoints: number;
        reducedMetadata: {
            name: string;
            symbol: string;
            description?: string | undefined;
            external_url?: string | undefined;
            image?: string | undefined;
            attributes?: import("..").JsonMetadataAttribute[] | undefined;
            properties?: import("..").JsonMetadataProperties | undefined;
            isMutable?: boolean | undefined;
            maxSupply?: any;
            creators?: import("@metaplex-foundation/js").CreatorInput[] | undefined;
            uses?: import("@metaplex-foundation/js").Option<import("@metaplex-foundation/mpl-token-metadata").Uses> | undefined;
            isCollection?: boolean | undefined;
            collection?: import("@metaplex-foundation/js").Option<import("@solana/web3.js").PublicKey> | undefined;
            collectionAuthority?: import("@metaplex-foundation/js").Option<import("@metaplex-foundation/js").Signer> | undefined;
            collectionAuthorityIsDelegated?: boolean | undefined;
            collectionIsSized?: boolean | undefined;
        };
    }, Error> | import("@solana-suite/shared").Result.Err<{
        uri: string;
        sellerFeeBasisPoints: number;
        reducedMetadata: {
            name: string;
            symbol: string;
            description?: string | undefined;
            external_url?: string | undefined;
            image?: string | undefined;
            attributes?: import("..").JsonMetadataAttribute[] | undefined;
            properties?: import("..").JsonMetadataProperties | undefined;
            isMutable?: boolean | undefined;
            maxSupply?: any;
            creators?: import("@metaplex-foundation/js").CreatorInput[] | undefined;
            uses?: import("@metaplex-foundation/js").Option<import("@metaplex-foundation/mpl-token-metadata").Uses> | undefined;
            isCollection?: boolean | undefined;
            collection?: import("@metaplex-foundation/js").Option<import("@solana/web3.js").PublicKey> | undefined;
            collectionAuthority?: import("@metaplex-foundation/js").Option<import("@metaplex-foundation/js").Signer> | undefined;
            collectionAuthorityIsDelegated?: boolean | undefined;
            collectionIsSized?: boolean | undefined;
        };
    }, Error>>;
    mint: (input: import("..").InputMetaplexMetadata, owner: import("@solana/web3.js").Keypair, feePayer?: import("@solana/web3.js").Keypair | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, import("..").ValidatorError | Error>>;
};
