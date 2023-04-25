export declare const PhantomSplToken: {
    mint: (input: InputTokenMetadata, owner: import("@solana-suite/shared").Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: import("..").Phantom) => Promise<import("@solana-suite/shared").Result<string, Error>>;
    add: (tokenKey: import("@solana-suite/shared").Pubkey, owner: import("@solana-suite/shared").Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: import("..").Phantom) => Promise<import("@solana-suite/shared").Result<string, Error>>;
};
