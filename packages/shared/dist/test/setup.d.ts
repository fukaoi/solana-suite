import { Keypair, PublicKey } from '@solana/web3.js';
export declare class KeypairStr {
    pubkey: string;
    secret: string;
    constructor(pubkey: string, secret: string);
    toPubkey(): PublicKey;
    toKeypair(): Keypair;
}
export declare namespace Setup {
    const generatekeyPair: () => Promise<{
        source: KeypairStr;
        dest: KeypairStr;
    }>;
}
