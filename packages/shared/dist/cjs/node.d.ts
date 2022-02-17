import { Connection } from '@solana/web3.js';
export declare namespace Node {
    const getConnection: (cluster?: string, commitment?: import("@solana/web3.js").Commitment) => Connection;
}
