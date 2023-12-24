import { Offchain } from '../storage';
import { Pubkey } from '../account';

export type Authority = { address: Pubkey; scopes: string[] };
export type Creators = {
  address: Pubkey;
  share: number;
  verified: boolean;
}[];

export type Metadata = {
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

export type NftMetadata = {
  page: number;
  total: number;
  limit: number;
  metadatas: Metadata[];
};
