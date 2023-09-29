import { Keypair, PublicKey } from '@solana/web3.js';

declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;

export type Pubkey = (string & { [pubKeyNominality]: never }) | string;
export type Secret = (string & { [secretNominality]: never }) | string;

declare global {
  interface String {
    toPublicKey(): PublicKey;
    toKeypair(): Keypair;
  }
}
