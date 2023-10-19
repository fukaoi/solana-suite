import { TransactionInstruction, PublicKey, Keypair } from '@solana/web3.js';

declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;
type Pubkey = (string & {
    [pubKeyNominality]: never;
}) | string;
type Secret = (string & {
    [secretNominality]: never;
}) | string;

/**
 * Get Associated token Account.
 * if not created, create new token accouint
 *
 * @param {Pubkey} mint
 * @param {Pubkey} owner
 * @param {Secret} feePayer
 * @param {boolean} allowOwnerOffCurve
 * @returns Promise<string | Instruction>
 */
declare namespace AssociatedAccount {
    /**
     * Retry function if create new token accouint
     *
     * @param {Pubkey} mint
     * @param {Pubkey} owner
     * @param {Secret} feePayer
     * @returns Promise<string>
     */
    const retryGetOrCreate: (mint: Pubkey, owner: Pubkey, feePayer: Secret) => Promise<string>;
    /**
     * [Main logic]Get Associated token Account.
     * if not created, create new token accouint
     *
     * @param {Pubkey} mint
     * @param {Pubkey} owner
     * @param {Pubkey} feePayer
     * @returns Promise<string>
     */
    const makeOrCreateInstruction: (mint: Pubkey, owner: Pubkey, feePayer?: Pubkey, allowOwnerOffCurve?: boolean) => Promise<{
        tokenAccount: string;
        inst: TransactionInstruction | undefined;
    }>;
}

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

export { AssociatedAccount, KeypairAccount, Pda };
