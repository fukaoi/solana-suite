import { PublicKey, TransactionInstruction } from '@solana/web3.js';
export declare namespace Wallet {
    type Unit = 'sol' | 'lamports';
    export interface KeyPair {
        pubkey: string;
        secret: string;
    }
    export const DEFAULT_AIRDROP_AMOUNT: number;
    export const getBalance: (pubkey: PublicKey, unit?: Unit) => Promise<number>;
    export const create: () => Promise<KeyPair>;
    export const findAssocaiatedTokenAddress: (source: PublicKey, tokenKey: PublicKey) => Promise<PublicKey>;
    export const findMetaplexAssocaiatedTokenAddress: (tokenKey: PublicKey) => Promise<PublicKey>;
    export const createAssociatedTokenAccountInstruction: (associatedToken: PublicKey, payer: PublicKey, source: PublicKey, mintKey: PublicKey) => TransactionInstruction;
    export {};
}
