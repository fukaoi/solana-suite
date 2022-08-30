/// <reference types="@solana/web3.js" />
export declare const SolNative: {
    transferWithMultisig: (owner: import("@solana/web3.js").PublicKey, dest: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Signer[], amount: number, feePayer?: import("@solana/web3.js").Signer | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    transfer: (source: import("@solana/web3.js").PublicKey, destination: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Signer[], amount: number, feePayer?: import("@solana/web3.js").Signer | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    feePayerPartialSignTransfer: (owner: import("@solana/web3.js").PublicKey, dest: import("@solana/web3.js").PublicKey, signers: import("@solana/web3.js").Signer[], amount: number, feePayer: import("@solana/web3.js").PublicKey) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").PartialSignInstruction, Error>>;
    getHistory: (searchPubkey: import("@solana/web3.js").PublicKey, options?: {
        limit?: number | undefined;
        actionFilter?: import("..").Filter[] | undefined;
        directionFilter?: import("..").DirectionFilter | undefined;
    } | undefined) => Promise<import("@solana-suite/shared").Result<import("..").TransferHistory[], Error>>;
    findByOwner: (owner: import("@solana/web3.js").PublicKey) => Promise<import("@solana-suite/shared").Result<import("..").SolNativeOwnerInfo, Error>>;
};
