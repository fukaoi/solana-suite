import { Connection, Commitment } from '@solana/web3.js';
export declare namespace Node {
    const getConnection: () => Connection;
    const changeConnection: (param: {
        cluster?: string;
        commitment?: Commitment;
    }) => void;
}
