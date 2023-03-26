/// <reference types="node" />
import BN from 'bn.js';
import { Pubkey } from '@solana-suite/shared';
import { PublicKey } from '@solana/web3.js';
export type Option<T> = T | null;
export type bignum = number | BN;
export type FileContent = string | Buffer | Uint8Array | ArrayBuffer;
export declare namespace _Common {
    type Uses = {
        useMethod: UseMethod;
        remaining: bignum;
        total: bignum;
    };
    type Properties = {
        creators?: {
            address?: string;
            share?: number;
            [key: string]: unknown;
        }[];
        files?: {
            type?: string;
            filePath?: FileContent;
            [key: string]: unknown;
        }[];
        [key: string]: unknown;
    };
    type Collection = {
        name?: string;
        family?: string;
        [key: string]: unknown;
    };
    enum UseMethod {
        Burn = 0,
        Multiple = 1,
        Single = 2
    }
}
export declare namespace Infra {
    type Collection = Option<{
        verified: boolean;
        key: PublicKey;
    }>;
    type Properties = _Common.Properties;
    type Creators = {
        readonly address: PublicKey;
        readonly share: number;
        readonly verified: boolean;
    };
    type Attribute = {
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    };
}
export declare namespace User {
    type Collection = Option<Pubkey>;
    type Properties = _Common.Properties;
    type Creators = {
        readonly address: Pubkey;
        readonly share: number;
        readonly verified: boolean;
    };
    type Attribute = {
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    };
}
