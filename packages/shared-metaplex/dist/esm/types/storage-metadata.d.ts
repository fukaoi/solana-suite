import { JsonMetadata } from '@metaplex-foundation/js';
export type StorageType = 'nftStorage' | 'arweave';
export type StorageNftStorageMetadata = JsonMetadata & {
    storageType?: 'nftStorage';
};
export type StorageArweaveMetadata = JsonMetadata & {
    storageType?: 'arweave';
};
export type StorageMetadata = StorageArweaveMetadata | (StorageNftStorageMetadata & {
    name: string;
    symbol: string;
    seller_fee_basis_points: number;
});
export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}
