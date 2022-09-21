import { Keypair, Transaction } from '@solana/web3.js';
export declare type InitializeNftMint = {
    useNewMint: Keypair;
    tx: Transaction;
};
