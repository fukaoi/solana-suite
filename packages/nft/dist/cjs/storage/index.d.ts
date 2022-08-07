export * from './arweave';
export * from './nft-storage';
import { JsonMetadata } from "@metaplex-foundation/js";
export declare type StorageNftStorageMetadata = JsonMetadata & {
    storageType?: 'nftStorage';
};
export declare type StorageArweaveMetadata = JsonMetadata & {
    storageType?: 'arweave';
};
export declare type NftStorageMetadata = StorageArweaveMetadata | StorageNftStorageMetadata;
