import { JsonMetadata } from '@metaplex-foundation/js';
export declare type StorageNftStorageMetadata = JsonMetadata & {
    storageType?: 'nftStorage';
};
export declare type StorageArweaveMetadata = JsonMetadata & {
    storageType?: 'arweave';
};
export declare type NftStorageMetadata = StorageArweaveMetadata | StorageNftStorageMetadata & {
    name: string;
    symbol: string;
    seller_fee_basis_points: number;
};
