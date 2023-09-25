import { PublicKey, Keypair } from '@solana/web3.js';
import { Secret, Pubkey } from 'types/account';
import { Pubkey as Pubkey$1 } from '@solana-suite/shared';

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
    const getMetadata: (mint: Pubkey$1) => PublicKey;
    const getMasterEdition: (mint: Pubkey$1) => PublicKey;
}

export { KeypairAccount, Pda };
