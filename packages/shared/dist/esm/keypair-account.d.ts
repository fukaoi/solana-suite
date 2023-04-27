import { Keypair, PublicKey } from '@solana/web3.js';
import { Pubkey, Secret } from './types/keypair-account';
export declare class KeypairAccount {
    secret: Secret;
    pubkey: Pubkey;
    constructor(params: {
        pubkey?: Pubkey;
        secret: Secret;
    });
    toPublicKey(): PublicKey;
    toKeypair(): Keypair;
    static isPubkey: (value: string) => value is Pubkey;
    static isSecret: (value: string) => value is Secret;
    static create: () => KeypairAccount;
    static toKeyPair: (keypair: Keypair) => KeypairAccount;
}
