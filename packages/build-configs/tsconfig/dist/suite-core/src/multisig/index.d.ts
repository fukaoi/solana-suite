export declare const Multisig: {
    isAddress: (multisig: import("shared").Pubkey) => Promise<import("shared").Result<boolean, Error>>;
    getInfo: (multisig: import("shared").Pubkey) => Promise<import("shared").Result<import("@solana/buffer-layout").LayoutObject, Error>>;
    create: (m: number, feePayer: import("shared").Secret, signerPubkeys: import("shared").Pubkey[]) => Promise<import("shared").Result<import("shared").Instruction, Error>>;
};
