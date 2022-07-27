export * from './arweave';
export * from './nft-storage';

import {
  JsonMetadata,
} from "@metaplex-foundation/js";

export type StorageNftStorageMetadata = JsonMetadata & {
  storageType?: 'nftStorage';
};

export type StorageArweaveMetadata = JsonMetadata & { 
  storageType?: 'arweave',
};

export type NftStorageMetadata = StorageArweaveMetadata | StorageNftStorageMetadata;
