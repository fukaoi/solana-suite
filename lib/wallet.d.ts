import { PublicKey, TransactionInstruction } from '@solana/web3.js';
export declare namespace Wallet {
    type Unit = 'sol' | 'lamports';
    export interface Keypair {
        pubkey: string;
        secret: string;
    }
    export const DEFAULT_AIRDROP_AMOUNT: number;
    export const getBalance: (pubkey: string, unit?: Unit) => Promise<number>;
    export const create: () => Promise<Keypair>;
    export const findAssocaiatedTokenAddress: (sourcePubkey: string, tokenId: string) => Promise<PublicKey>;
    export const findMetaplexAssocaiatedTokenAddress: (tokenId: string) => Promise<PublicKey>;
    export const createAssociatedTokenAccountInstruction: (associatedTokenAddress: string, payer: string, sourcePubkey: string, mintKey: string) => TransactionInstruction;
    export {};
}
