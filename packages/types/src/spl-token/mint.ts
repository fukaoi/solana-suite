import { Pubkey, Secret } from '../account';
import { Attribute, StorageType } from '../storage';
import { FileType } from '../storage';
import { InputCreators, Options, Uses } from '../regular-nft';

export type MintOptions = {
  feePayer: Secret;
  freezeAuthority: Pubkey;
};

export type InputTokenMetadata = {
  name: string;
  symbol: string;
  filePath?: FileType;
  uri?: string;
  storageType: StorageType;
  description?: string;
  royalty?: number;
  uses?: Uses;
  creators?: InputCreators[];
  attributes?: Attribute[];
  options?: Options;
};
