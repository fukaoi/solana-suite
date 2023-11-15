import { Pubkey } from '../account';
import { Offchain } from '../storage';
import { Creators, Option, Uses } from './common';

export type Collection = { address: Pubkey; verified: boolean };
export type CollectionDetails = { __kind: string; size: number };

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
  collection?: Collection | undefined;
  collectionDetails?: CollectionDetails | undefined;
  creators?: Creators[] | undefined;
  uses?: Uses | undefined;
  dateTime?: Date | undefined;
};
