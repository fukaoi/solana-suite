import { MetaplexFileContent } from '@metaplex-foundation/js';

export type JsonMetadataAttribute = {
  trait_type?: string;
  value?: string;
  [key: string]: unknown;
};

export type InputTokenMetadata = {
  name: string;
  symbol: string;
  royalty: number;
  filePath: MetaplexFileContent;
  storageType: 'arweave' | 'nftStorage';
  description?: string;
  external_url?: string;
  attributes?: JsonMetadataAttribute[];
  creators?: null;
  collection?: null;
  uses?: null;
  animation_url?: string;
};
