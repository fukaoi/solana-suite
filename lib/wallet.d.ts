import { Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js';
export declare namespace Wallet {
    type Unit = 'sol' | 'lamports';
    export interface KeyPair {
        pubkey: string;
        secret: string;
    }
    export const DEFAULT_AIRDROP_AMOUNT: number;
    export const createSigners: (signerSecrets: string[]) => Keypair[];
    export const getBalance: (pubkey: string, unit?: Unit) => Promise<number>;
    export const create: () => Promise<KeyPair>;
    export const findAssocaiatedTokenAddress: (sourcePubkey: string, tokenId: string) => Promise<PublicKey>;
    export const findMetaplexAssocaiatedTokenAddress: (tokenId: string) => Promise<PublicKey>;
    export const createAssociatedTokenAccountInstruction: (associatedTokenAddress: string, payer: string, sourcePubkey: string, mintKey: string) => TransactionInstruction;
    export {};
}
