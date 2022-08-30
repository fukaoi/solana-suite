/// <reference types="@solana/web3.js" />
export declare const SplToken: {
    transfer: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, dest: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Signer[], amount: number, mintDecimal: number, feePayer?: import("@solana/web3.js").Signer | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    feePayerPartialSignTransfer: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, dest: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Signer[], amount: number, mintDecimal: number, feePayer: import("@solana/web3.js").PublicKey) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").PartialSignInstruction, Error>>;
    mint: (owner: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Signer[], totalAmount: number, mintDecimal: number, feePayer?: import("@solana/web3.js").Signer | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    findByOwner: (owner: import("@solana/web3.js").PublicKey) => Promise<import("@solana-suite/shared").Result<import("..").SplTokenOwnerInfo[], Error>>;
    getHistory: (mint: import("@solana/web3.js").PublicKey, searchPubkey: import("@solana/web3.js").PublicKey, options?: {
        limit?: number | undefined;
        actionFilter?: import("..").Filter[] | undefined;
        directionFilter?: import("..").DirectionFilter | undefined;
    } | undefined) => Promise<import("@solana-suite/shared").Result<import("..").TransferHistory[], Error>>;
    burn: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Signer[], burnAmount: number, tokenDecimals: number, feePayer?: import("@solana/web3.js").Signer | undefined) => Promise<import("@solana-suite/shared").Result.Ok<import("@solana-suite/shared").Instruction, Error> | import("@solana-suite/shared").Result.Err<import("@solana-suite/shared").Instruction, Error>>;
};
