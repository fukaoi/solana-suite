import { Pubkey } from '../account';
import { Attribute, Offchain } from '../storage';
import { Creators, Option, Uses } from './common';

export type Collection = { address: Pubkey; verified: boolean };
export type CollectionDetails = { __kind: string; size: number };

/////////// NFT //////////////
export type NftMetadata = {
  mint: string;
  updateAuthority: string;
  royalty: number;
  name: string;
  symbol: string;
  uri: string;
  isMutable: boolean;
  primarySaleHappened: boolean;
  editionNonce: Option<number>;
  offchain: Offchain;
  tokenAmount: string;
  collection?: Collection | undefined;
  collectionDetails?: CollectionDetails | undefined;
  creators?: Creators[] | undefined;
  uses?: Uses | undefined;
  dateTime?: Date | undefined;
};

/////////// TOKEN //////////////
export type TokenMetadata = {
  mint: string;
  name: string;
  symbol: string;
  uri: string;
  royalty: number;
  offchain: Offchain;
  tokenAmount: string;
  attributes?: Attribute | undefined;
  creators?: Creators[] | undefined;
  uses?: Uses | undefined;
  dateTime?: Date | undefined;
};
