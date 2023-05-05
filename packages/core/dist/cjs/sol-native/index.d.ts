export declare const SolNative: {
    transferWithMultisig: (owner: import("@solana-suite/shared").Pubkey, dest: import("@solana-suite/shared").Pubkey, signers: import("@solana-suite/shared").Secret[], amount: number, feePayer?: import("@solana-suite/shared").Secret | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    transfer: (source: import("@solana-suite/shared").Pubkey, dest: import("@solana-suite/shared").Pubkey, signers: import("@solana-suite/shared").Secret[], amount: number, feePayer?: import("@solana-suite/shared").Secret | undefined) => import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>;
    getHistory: (searchPubkey: import("@solana-suite/shared").Pubkey, callback: (result: import("@solana-suite/shared").Result<import("..").UserSideOutput.History[], Error>) => void, options?: {
        actionFilter?: import("..").FilterType[] | undefined;
        directionFilter?: import("..").DirectionFilter | undefined;
    } | undefined) => Promise<void>;
    feePayerPartialSignTransfer: (owner: import("@solana-suite/shared").Pubkey, dest: import("@solana-suite/shared").Pubkey, signers: import("@solana-suite/shared").Secret[], amount: number, feePayer: import("@solana-suite/shared").Pubkey) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").PartialSignInstruction, Error>>;
    findByOwner: (owner: import("@solana-suite/shared").Pubkey) => Promise<import("@solana-suite/shared").Result<import("..").SolNativeOwnerInfo, Error>>;
};
