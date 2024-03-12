import { Keypair, Transaction } from '@solana/web3.js';
export { P as PhantomProvider, c as connectOption } from './phantom-aWSz-JUw.mjs';

type InitializeMint = {
    mint: Keypair;
    tx: Transaction;
};

export type { InitializeMint };
