import { PublicKey, Keypair } from '@solana/web3.js';

declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;
type Pubkey = (string & {
    [pubKeyNominality]: never;
}) | string;
type Secret = (string & {
    [secretNominality]: never;
}) | string;
declare global {
    interface String {
        toPublicKey(): PublicKey;
        toKeypair(): Keypair;
    }
}

export { Pubkey, Secret };
