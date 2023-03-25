import { Infra, _Common } from '../shared';
export type StorageMetadata = {
    name?: string;
    symbol?: string;
    description?: string;
    seller_fee_basis_points?: number;
    image?: string;
    external_url?: string;
    attributes?: Infra.Attribute[];
    properties?: _Common.Properties[];
    collection?: _Common.Collection;
};
export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}
export type StorageType = 'nftStorage' | 'arweave';
export type StorageNftStorageMetadata = {
    storageType?: 'nftStorage';
};
export type StorageArweaveMetadata = {
    storageType?: 'arweave';
};
