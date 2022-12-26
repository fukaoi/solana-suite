/// <reference types="@solana/web3.js" />
export declare const Metaplex: {
    transfer: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, dest: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Keypair[], feePayer?: import("@solana/web3.js").Keypair | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    feePayerPartialSignTransferNft: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, dest: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Keypair[], feePayer: import("@solana/web3.js").PublicKey) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").PartialSignInstruction, Error>>;
    THRESHOLD: 100;
    convertRoyalty: (percentage: number) => number;
    uploadMetaContent: (input: import("..").InputMetaplexMetadata, feePayer: import("..").BundlrSigner) => Promise<{
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
    }>;
    createNftBuilderInstruction: (owner: import("..").BundlrSigner, params: import("@metaplex-foundation/js").CreateNftBuilderParams, useNewMint: import("@solana/web3.js").Keypair, updateAuthority: import("@solana/web3.js").Keypair | import("@metaplex-foundation/js/dist/types/plugins/identityModule").IdentityClient, mintAuthority: import("@solana/web3.js").Keypair | import("@metaplex-foundation/js/dist/types/plugins/identityModule").IdentityClient, tokenOwner: import("@solana/web3.js").PublicKey) => Promise<import("@solana/web3.js").TransactionInstruction[]>;
    feePayerPartialSignMint: (input: import("..").InputMetaplexMetadata, owner: import("@solana/web3.js").Keypair, feePayer: import("@solana/web3.js").PublicKey) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").PartialSignInstruction, Error>>;
    findByOwner: (owner: import("@solana/web3.js").PublicKey) => Promise<import("@solana-suite/shared").Result<import("..").OutputMetaplexMetadata[], Error>>;
    mint: (input: import("..").InputMetaplexMetadata, owner: import("@solana/web3.js").Keypair, feePayer?: import("@solana/web3.js").Keypair | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").MintInstruction, Error>>;
};
