import { Keypair, Transaction } from '@solana/web3.js';

export type InitializeNftMint = {
  useNewMint: Keypair;
  tx: Transaction;
};
