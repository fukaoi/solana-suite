import { Keypair, PublicKey, TokenAmount } from '@solana/web3.js';
import { Result } from './';
export declare type Pubkey = string;
export declare type Secret = string;
export declare class KeypairStr {
    pubkey: Pubkey;
    secret: Secret;
    constructor(pubkey: Pubkey, secret: Secret);
    toPubkey(): PublicKey;
    toKeypair(): Keypair;
}
export declare namespace Account {
    type Unit = 'sol' | 'lamports';
    export const DEFAULT_AIRDROP_AMOUNT: number;
    export const MAX_AIRDROP_SOL: number;
    export const getBalance: (pubkey: PublicKey, unit?: Unit) => Promise<Result<number, Error>>;
    export const getTokenBalance: (pubkey: PublicKey, tokenKey: PublicKey) => Promise<Result<TokenAmount, Error>>;
    export const requestAirdrop: (pubkey: PublicKey, airdropAmount?: number | undefined) => Promise<Result<string, Error>>;
    export const create: () => KeypairStr;
    export const findAssocaiatedTokenAddress: (owner: PublicKey, tokenKey: PublicKey) => Promise<Result<PublicKey, Error>>;
    export const findMetaplexAssocaiatedTokenAddress: (tokenKey: PublicKey) => Promise<Result<PublicKey, Error>>;
    export {};
}
