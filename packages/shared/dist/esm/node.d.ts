import { Connection, Commitment } from '@solana/web3.js';
export declare namespace Node {
    let cluster: string;
    let commitment: Commitment;
    export const getConnection: () => Connection;
    export const changeConnection: (param: {
        cluster?: string;
        commitment?: Commitment;
    }) => void;
    export {};
}
