/// <reference types="@solana/web3.js" />
export declare const SplToken: {
    transfer: (mint: import("@solana-suite/shared").Pubkey, owner: import("@solana-suite/shared").Pubkey, dest: import("@solana-suite/shared").Pubkey, signers: import("@solana-suite/shared").Secret[], amount: number, mintDecimal: number, feePayer?: import("@solana-suite/shared").Secret | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    createMintInstructions: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: import("@solana-suite/shared-metaplex")._TokenMetadata, feePayer: import("@solana/web3.js").PublicKey, isMutable: boolean) => Promise<import("@solana/web3.js").TransactionInstruction[]>;
    mint: (owner: import("@solana-suite/shared").Pubkey, signer: import("@solana-suite/shared").Secret, totalAmount: number, mintDecimal: number, input: import("@solana-suite/shared-metaplex").InputTokenMetadata, feePayer?: import("@solana-suite/shared").Secret | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").MintInstruction, Error>>;
    feePayerPartialSignTransfer: (mint: import("@solana-suite/shared").Pubkey, owner: import("@solana-suite/shared").Pubkey, dest: import("@solana-suite/shared").Pubkey, signers: import("@solana-suite/shared").Secret[], amount: number, mintDecimal: number, feePayer: import("@solana-suite/shared").Pubkey) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").PartialSignInstruction, Error>>;
    findByOwner: (owner: import("@solana-suite/shared").Pubkey) => Promise<import("@solana-suite/shared").Result<import("..").SplTokenOwnerInfo[], Error>>;
    getHistory: (mint: import("@solana-suite/shared").Pubkey, searchPubkey: import("@solana-suite/shared").Pubkey, options?: {
        limit?: number | undefined;
        actionFilter?: import("..").Filter[] | undefined;
        directionFilter?: import("..").DirectionFilter | undefined;
    } | undefined) => Promise<import("@solana-suite/shared").Result<import("..").TransferHistory[], Error>>;
    burn: (mint: import("@solana-suite/shared").Pubkey, owner: import("@solana-suite/shared").Pubkey, signers: import("@solana-suite/shared").Secret[], burnAmount: number, tokenDecimals: number, feePayer?: import("@solana-suite/shared").Secret | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    add: (token: import("@solana-suite/shared").Pubkey, owner: import("@solana-suite/shared").Pubkey, signers: import("@solana-suite/shared").Secret[], totalAmount: number, mintDecimal: number, feePayer?: import("@solana-suite/shared").Secret | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
};
