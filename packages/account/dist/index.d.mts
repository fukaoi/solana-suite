import { PublicKey, Keypair } from '@solana/web3.js';
import { Secret, Pubkey } from 'types/account';

declare class KeypairAccount {
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

declare namespace Pda {
    const getMetadata: (mint: Pubkey) => PublicKey;
    const getMasterEdition: (mint: Pubkey) => PublicKey;
}

export { KeypairAccount, Pda };
