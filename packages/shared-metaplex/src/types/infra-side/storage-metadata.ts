export type StorageMetadata = {
  name?: string;
  symbol?: string;
  description?: string;
  seller_fee_basis_points?: number;
  image?: string;
  external_url?: string;
  attributes?: Array<{
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
  }>;
  properties?: {
    creators?: Array<{
      address?: string;
      share?: number;
      [key: string]: unknown;
    }>;
    files?: Array<{
      type?: string;
      uri?: string;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  };
  collection?: {
    name?: string;
    family?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
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
