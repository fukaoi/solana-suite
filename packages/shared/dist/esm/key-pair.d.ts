import { Keypair, PublicKey } from '@solana/web3.js';
import { Pubkey, Secret } from './types/key-pair';
export declare class KeyPair {
    pubkey: Pubkey;
    secret: Secret;
    constructor(params: {
        pubkey?: Pubkey;
        secret: Secret;
    });
    toPublicKey(): PublicKey;
    toKeypair(): Keypair;
    static isPubkey: (value: string) => value is Pubkey;
    static isSecret: (value: string) => value is Secret;
    static create: () => KeyPair;
    static toKeyPair: (keypair: Keypair) => KeyPair;
}
