import { Pubkey } from '../account';
import { Attribute, Properties, StorageType } from '../storage';
import { FileType } from '../storage';
import { InternalCollection, InternalCreators } from '../converter';
import { bignum, Creators, Option, Uses } from './common';

export type InputCollection = Pubkey;
export type Options = { [key: string]: unknown };

export type MetaplexDataV2 = {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Option<InternalCreators[]>;
  collection: Option<InternalCollection>;
  uses: Option<Uses>;
};
export enum TokenStandard {
  NonFungible = 0,
  FungibleAsset = 1,
  Fungible = 2,
  NonFungibleEdition = 3,
  ProgrammableNonFungible = 4,
}

export type InputNftMetadata = {
  name: string;
  symbol: string;
  royalty: number;
  storageType: StorageType;
  filePath?: FileType;
  uri?: string;
  isMutable?: boolean;
  description?: string;
  external_url?: string;
  attributes?: Attribute[];
  properties?: Properties;
  maxSupply?: bignum;
  creators?: Creators[];
  uses?: Uses;
  collection?: InputCollection;
  options?: Options;
};
