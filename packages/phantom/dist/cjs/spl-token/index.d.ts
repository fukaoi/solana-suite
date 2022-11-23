/// <reference types="@solana/web3.js" />
export declare const SplToken: {
    mint: (owner: import("@solana/web3.js").PublicKey, cluster: string, totalAmount: number, mintDecimal: number, phantom: import("..").Phantom) => Promise<import("@solana-suite/shared").Result<string, Error>>;
    add: (tokenKey: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, cluster: string, totalAmount: number, mintDecimal: number, phantom: import("..").Phantom) => Promise<import("@solana-suite/shared").Result<string, Error>>;
};
