import { FileContent, Option } from '../shared';
import { StorageType } from '../infra-side/storage-metadata';
import { User, _Common } from '../shared';

export type InputTokenMetadata = {
  name: string;
  symbol: string;
  filePath?: FileContent;
  uri?: string;
  storageType?: StorageType;
  description?: string;
  royalty?: number;
  attributes?: User.Attribute[];
  creators?: User.Creators[];
  uses?: Option<_Common.Uses>;
  options?: { [key: string]: unknown };
};
