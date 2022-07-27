import {
  JsonMetadata,
} from "@metaplex-foundation/js";

export type StorageNftStorageData = JsonMetadata & {
  storageType?: 'nftStorage';
};

export type StorageArweaveData = JsonMetadata & { 
  storageType?: 'arweave',
};

export type NftStorageData = StorageArweaveData | StorageNftStorageData;
