export declare const Multisig: {
    isAddress: (multisig: import("@solana-suite/shared").Pubkey) => Promise<import("@solana-suite/shared").Result<boolean, Error>>;
    getInfo: (multisig: import("@solana-suite/shared").Pubkey) => Promise<import("@solana-suite/shared").Result<import("@solana/buffer-layout").LayoutObject, Error>>;
    create: (m: number, feePayer: import("@solana-suite/shared").Secret, signerPubkeys: import("@solana-suite/shared").Pubkey[]) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
};
//# sourceMappingURL=index.d.ts.map