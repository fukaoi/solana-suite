/// <reference types="node" />
import BN from 'bn.js';
export type Option<T> = T | null;
export type bignum = number | BN;
export type FileContent = string | Buffer | Uint8Array | ArrayBuffer;
export declare namespace _Shared {
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
    type Attribute = {
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    };
    enum UseMethod {
        Burn = 0,
        Multiple = 1,
        Single = 2
    }
    enum TokenStandard {
        NonFungible = 0,
        FungibleAsset = 1,
        Fungible = 2,
        NonFungibleEdition = 3,
        ProgrammableNonFungible = 4
    }
    type Uses = {
        useMethod: UseMethod;
        remaining: bignum;
        total: bignum;
    };
    type Options = {
        [key: string]: unknown;
    };
}
