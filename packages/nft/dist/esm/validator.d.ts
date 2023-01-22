import { MetaplexFileContent } from '@metaplex-foundation/js';
import { Result } from '@solana-suite/shared';
import { NftStorageMetadata } from '@solana-suite/storage';
import { InputMetaplexMetadata, MetaplexMetaData } from './types/mint';
import { Details } from './types/validator';
export declare namespace Validator {
    export namespace Message {
        const SUCCESS = "success";
        const SMALL_NUMBER = "too small";
        const BIG_NUMBER = "too big";
        const LONG_LENGTH = "too long";
        const EMPTY = "invalid empty value";
        const INVALID_URL = "invalid url";
        const ONLY_NODE_JS = "`string` type is only Node.js";
    }
    export const NAME_LENGTH = 32;
    export const SYMBOL_LENGTH = 10;
    export const URL_LENGTH = 200;
    export const ROYALTY_MAX = 100;
    export const SELLER_FEE_BASIS_POINTS_MAX = 10000;
    export const ROYALTY_MIN = -1;
    export const isRoyalty: (royalty: number) => Result<string, ValidatorError>;
    export const isSellerFeeBasisPoints: (royalty: number) => Result<string, ValidatorError>;
    export const isName: (name: string) => Result<string, ValidatorError>;
    export const isSymbol: (symbol: string) => Result<string, ValidatorError>;
    export const isFilePath: (filePath: MetaplexFileContent) => Result<string, ValidatorError>;
    export const isUri: (uri: string) => Result<string, ValidatorError>;
    export const isImageUrl: (image: string) => Result<string, ValidatorError>;
    export const checkAll: <T extends PickNftStorage | PickNftStorageMetaplex | PickMetaplex>(metadata: T) => Result<string, ValidatorError>;
    type PickNftStorage = Pick<NftStorageMetadata, 'name' | 'symbol' | 'image' | 'seller_fee_basis_points'>;
    type PickNftStorageMetaplex = Pick<InputMetaplexMetadata, 'name' | 'symbol' | 'royalty' | 'filePath'>;
    type PickMetaplex = Pick<MetaplexMetaData, 'name' | 'symbol' | 'uri' | 'sellerFeeBasisPoints'>;
    export {};
}
export declare class ValidatorError extends Error {
    details: Details[];
    constructor(message: string, details: Details[]);
}
