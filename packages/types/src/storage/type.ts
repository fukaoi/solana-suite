import { Asset } from '../das-api';
import { FileType } from './irys';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

export type StorageType = 'nftStorage' | 'arweave' | string;

export type MetadataAndOffchain = {
  onchain: Metadata;
  offchain: Offchain;
};

export type AssetAndOffchain = {
  onchain: Asset;
  offchain: Offchain;
};

export type Offchain = {
  name?: string;
  symbol?: string;
  description?: string;
  seller_fee_basis_points?: number;
  image?: string;
  external_url?: string;
  attributes?: Attribute[];
  properties?: Properties;
  collection?: {
    name?: string;
    family?: string;
    [key: string]: unknown;
  };
  collectionDetails?: {
    kind: string;
    size: number;
  };
  created_at?: number;
};

export type Properties = {
  creators?: {
    address?: string;
    share?: number;
    [key: string]: unknown;
  }[];
  files?: {
    type?: string;
    filePath?: FileType;
    uri?: string;
    [key: string]: unknown;
  }[];
  category?: string;
  [key: string]: unknown;
};

export type Attribute = {
  trait_type?: string;
  value?: string;
  [key: string]: unknown;
};
