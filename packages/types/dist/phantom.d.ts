import { Keypair, Transaction } from '@solana/web3.js';
export { P as PhantomProvider, c as connectOption } from './phantom-e9a40784.js';

type InitializeMint = {
    mint: Keypair;
    tx: Transaction;
};

export { InitializeMint };
