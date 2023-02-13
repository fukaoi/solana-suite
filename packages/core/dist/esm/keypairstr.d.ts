import { Keypair, PublicKey } from '@solana/web3.js';
import { Pubkey, Secret } from './types/keypairstr';
export declare class KeypairStr {
    pubkey: Pubkey;
    secret: Secret;
    constructor(pubkey: Pubkey, secret: Secret);
    toPublicKey(): PublicKey;
    toKeypair(): Keypair;
    static isPubkey: (value: string) => value is Pubkey;
    static isSecret: (value: string) => value is Secret;
    static create: () => KeypairStr;
}
