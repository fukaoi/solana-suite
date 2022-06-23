import { Keypair, PublicKey, TokenAmount, Signer, TransactionInstruction } from '@solana/web3.js';
import { Instruction, Result } from '@solana-suite/shared';
export declare type Pubkey = string;
export declare type Secret = string;
export declare class KeypairStr {
    pubkey: Pubkey;
    secret: Secret;
    constructor(pubkey: Pubkey, secret: Secret);
    toPublicKey(): PublicKey;
    toKeypair(): Keypair;
}
export declare namespace Account {
    type Unit = 'sol' | 'lamports';
    export const DEFAULT_AIRDROP_AMOUNT: number;
    export const MAX_AIRDROP_SOL: number;
    export interface AccountInfo {
        lamports: number;
        owner: string;
        rentEpoch: number;
    }
    export interface TokenAccountInfo {
        mint: string;
        owner: string;
        tokenAmount: number;
    }
    export interface TokenInfoOwned {
        mint: string;
        tokenAmount: number;
    }
    export const getInfo: (pubkey: PublicKey) => Promise<Result<AccountInfo | TokenAccountInfo, Error>>;
    export const getBalance: (pubkey: PublicKey, unit?: Unit) => Promise<Result<number, Error>>;
    export const getTokenBalance: (pubkey: PublicKey, mint: PublicKey) => Promise<Result<TokenAmount, Error>>;
    export const getTokenInfoOwned: (pubkey: PublicKey) => Promise<Result<TokenInfoOwned[], Error>>;
    export const requestAirdrop: (pubkey: PublicKey, airdropAmount?: number) => Promise<Result<string, Error>>;
    export const create: () => KeypairStr;
    export const findAssocaiatedTokenAddress: (mint: PublicKey, owner: PublicKey) => Promise<Result<PublicKey, Error>>;
    export const getOrCreateAssociatedTokenAccountInstruction: (mint: PublicKey, owner: PublicKey, feePayer: PublicKey, allowOwnerOffCurve?: boolean) => Promise<Result<{
        tokenAccount: string;
        inst: TransactionInstruction | undefined;
    }, Error>>;
    export const getOrCreateAssociatedTokenAccount: (mint: PublicKey, owner: PublicKey, feePayer: Signer, allowOwnerOffCurve?: boolean) => Promise<Result<string | Instruction, Error>>;
    export {};
}
