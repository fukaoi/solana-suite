import {
  MetaplexFileContent,
  Option,
  CreatorInput,
} from '@metaplex-foundation/js';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
import {
  JsonMetadataAttribute,
  InputCreators,
  InputCollection,
  OutputCollection,
  _OutputCollection,
} from './nft-metadata';
import { StorageType } from './nft-storage-metadata';

export type Collection = OutputCollection;
export type _Collection = _OutputCollection;

export type InputTokenMetadata = {
  name: string;
  symbol: string;
  royalty: number;
  filePath: MetaplexFileContent;
  storageType: StorageType;
  attributes?: JsonMetadataAttribute[];
  creators?: InputCreators[];
  collection?: InputCollection;
  uses?: Option<Uses>;
};

export type TokenMetadata = {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  attributes?: JsonMetadataAttribute[];
  creators?: InputCreators[];
  collection?: Collection;
  uses?: Option<Uses>;
};

//---- Internal type ----//
export type _TokenMetadata = Omit<TokenMetadata, 'creators' | 'collection'> & {
  creators?: CreatorInput[];
  collection?: _Collection;
};
