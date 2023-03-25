import {
  MetaplexFileContent,
  Option,
  CreatorInput,
} from '@metaplex-foundation/js';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
import {
  MetadataAttribute,
  InputCreators,
  OutputCollection,
  _OutputCollection,
} from './nft-metadata';
import { StorageType } from './storage-metadata';

export type Collection = OutputCollection;
export type _Collection = _OutputCollection;

export type InputTokenMetadata = {
  name: string;
  symbol: string;
  royalty: number;
  filePath: MetaplexFileContent;
  storageType: StorageType;
  attributes?: MetadataAttribute[];
  creators?: InputCreators[];
  uses?: Option<Uses>;
};


// todo: OutpuTokenMetadata
export type TokenMetadata = {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  attributes?: MetadataAttribute[];
  creators?: InputCreators[];
  uses?: Option<Uses>;
};

//---- Internal type ----//
export type _TokenMetadata = Omit<TokenMetadata, 'creators'> & {
  creators?: CreatorInput[];
  collection?: _Collection;
};
