import { KeypairAccount } from '@solana-suite/shared';
import { Transaction } from '@solana/web3.js';
export type InitializeNftMint = {
    useNewMint: KeypairAccount;
    tx: Transaction;
};
