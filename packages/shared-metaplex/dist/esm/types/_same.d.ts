import { bignum, FileContent } from './shared';
export declare namespace _Same {
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
    type Attribute = {
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    };
    type Options = {
        [key: string]: unknown;
    };
}
