/// <reference types="@solana/web3.js" />
export declare const PhantomSplToken: {
    mint: (input: import("@solana-suite/shared-metaplex").InputTokenMetadata, owner: import("@solana/web3.js").PublicKey, cluster: string, totalAmount: number, mintDecimal: number, phantom: import("..").Phantom) => Promise<import("@solana-suite/shared").Result<string, Error>>;
    add: (tokenKey: import("@solana-suite/shared").Pubkey, owner: import("@solana-suite/shared").Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: import("..").Phantom) => Promise<import("@solana-suite/shared").Result<string, Error>>;
};
