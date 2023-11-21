import { Offchain } from '../storage';
import { Pubkey } from '../account';

export type SortBy = {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
};

export type Authority = { address: Pubkey; scopes: string[] };
export type Creators = {
  address: Pubkey;
  share: number;
  verified: boolean;
}[];

export type CompressedNftMetadata = {
  page: number;
  total: number;
  limit: number;
  metadatas: NftMetadata[];
};

export type NftMetadata = {
  mint: Pubkey;
  collectionMint: Pubkey;
  authorities: Authority[];
  royalty: number;
  name: string;
  symbol: string;
  uri: string;
  creators: Creators;
  treeAddress: Pubkey;
  isCompressed: boolean;
  isMutable: boolean;
  isBurn: boolean;
  editionNonce: number;
  primarySaleHappened: boolean;
  dateTime: Date;
  offchain: Offchain;
};
