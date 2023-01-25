/// <reference types="@solana/web3.js" />
export declare const SplToken: {
    transfer: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, dest: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Keypair[], amount: number, mintDecimal: number, feePayer?: import("@solana/web3.js").Keypair | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    mint: (owner: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Keypair[], totalAmount: number, mintDecimal: number, tokenMetadata: import("..").InputTokenMetadata, feePayer?: import("@solana/web3.js").Keypair | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    feePayerPartialSignTransfer: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, dest: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Keypair[], amount: number, mintDecimal: number, feePayer: import("@solana/web3.js").PublicKey) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").PartialSignInstruction, Error>>;
    findByOwner: (owner: import("@solana/web3.js").PublicKey) => Promise<import("@solana-suite/shared").Result<import("..").SplTokenOwnerInfo[], Error>>;
    getHistory: (mint: import("@solana/web3.js").PublicKey, searchPubkey: import("@solana/web3.js").PublicKey, options?: {
        limit?: number | undefined;
        actionFilter?: import("..").Filter[] | undefined;
        directionFilter?: import("..").DirectionFilter | undefined;
    } | undefined) => Promise<import("@solana-suite/shared").Result<import("..").TransferHistory[], Error>>;
    burn: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Keypair[], burnAmount: number, tokenDecimals: number, feePayer?: import("@solana/web3.js").Keypair | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    add: (token: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Keypair[], totalAmount: number, mintDecimal: number, feePayer?: import("@solana/web3.js").Keypair | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
};
