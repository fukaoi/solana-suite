import { Offchain } from '../storage';
import { Pubkey } from '../account';

export type Collection = [];
export type Creators = [];
export type Authority = { address: Pubkey; scopes: string[] };

export type CompressedNftMetadata = {
  mint: Pubkey;
  collectionMint: Pubkey;
  authorities: Authority[];
  royalty: number;
  name: string;
  symbol: string;
  uri: string;
  offchain: Offchain;
  collection: Collection;
  creators: Creators[];
  treeAddress: Pubkey;
  isMutable: boolean;
  isBurn: boolean;
  editionNonce: number;
  primarySaleHappened: boolean;
  dateTime: Date;
};
