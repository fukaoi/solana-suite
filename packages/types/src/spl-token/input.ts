import { Attribute, StorageType } from '../storage';
import { FileType } from '../storage';
import { Uses, Options, Creators } from '../regular-nft';

export type InputTokenMetadata = {
  name: string;
  symbol: string;
  filePath?: FileType;
  uri?: string;
  storageType?: StorageType;
  description?: string;
  royalty?: number;
  uses?: Uses;
  creators?: Creators[];
  attributes?: Attribute[];
  options?: Options;
};
