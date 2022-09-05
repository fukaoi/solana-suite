import {
  JsonMetadata,
} from '@metaplex-foundation/js';

export type StorageNftStorageMetadata = JsonMetadata & {
  storageType?: 'nftStorage';
};

export type StorageArweaveMetadata = JsonMetadata & {
  storageType?: 'arweave',
};

export type NftStorageMetadata = StorageArweaveMetadata | StorageNftStorageMetadata & {
    name: string;
    symbol: string;
    seller_fee_basis_points: number;
};

export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

export declare var File: {
    prototype: File;
    new(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
};

