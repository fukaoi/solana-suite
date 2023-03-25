import { FileContent, COption } from '../shared';
import { StorageType } from '../infra-side/storage-metadata';
import { User, _Common } from '../shared';

export type InputTokenMetadata = {
  name: string;
  symbol: string;
  royalty: number;
  filePath: FileContent;
  storageType: StorageType;
  attributes?: User.Attribute[];
  creators?: User.Creators[];
  uses?: COption<_Common.Uses>;
};
