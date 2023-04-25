/// <reference types="node" />
import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
export type Option<T> = T | null;
export type bignum = number | BN;
export type FileContent = string | Buffer | Uint8Array | ArrayBuffer;
export declare namespace Shared {
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
    enum UseMethod {
        Burn = 0,
        Multiple = 1,
        Single = 2
    }
    type Collection = {
        name?: string;
        family?: string;
        [key: string]: unknown;
    };
    type Creators = {
        readonly address: PublicKey;
        readonly share: number;
        readonly verified: boolean;
    }[];
    type Attributes = {
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    }[];
    type Options = {
        options?: {
            [key: string]: unknown;
        };
    };
}
