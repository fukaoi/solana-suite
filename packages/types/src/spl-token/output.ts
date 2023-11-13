import { Attribute, Offchain } from '../storage';
import { Creators, Uses } from '../nft';

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
