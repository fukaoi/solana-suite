import { Connection } from '@solana/web3.js';
export declare namespace Node {
    const getConnection: (network?: string, commitment?: import("@solana/web3.js").Commitment) => Connection;
}
