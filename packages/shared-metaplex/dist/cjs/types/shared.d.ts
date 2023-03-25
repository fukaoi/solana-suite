/// <reference types="node" />
import BN from 'bn.js';
import { Pubkey } from '@solana-suite/shared';
export type COption<T> = T | null;
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
    type Creators = {
        readonly address: Pubkey;
        readonly share: number;
        readonly verified: boolean;
    };
    enum UseMethod {
        Burn = 0,
        Multiple = 1,
        Single = 2
    }
}
export declare namespace Infra {
    type Collection = COption<Pubkey>;
    type Creators = _Common.Creators;
    type Properties = _Common.Properties;
    type Attribute = {
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    };
}
export declare namespace User {
    type Collection = COption<Pubkey>;
    type Creators = _Common.Creators;
    type Properties = _Common.Properties;
    type Attribute = {
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    };
}
