import { Keypair, PublicKey } from '@solana/web3.js';

import bs from 'bs58';

export type Pubkey = string;
export type Secret = string;
export interface AccountInfo {
  lamports: number;
  owner: string;
  rentEpoch: number;
}

export interface TokenAccountInfo {
  mint: string;
  owner: string;
  tokenAmount: number;
}

export interface TokenInfoOwned {
  mint: string;
  tokenAmount: number;
}


