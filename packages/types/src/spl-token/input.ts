import { Attribute, StorageType } from '../storage';
import { FileType } from '../storage';
import { Options, Uses, InputCreators } from '../nft';

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
