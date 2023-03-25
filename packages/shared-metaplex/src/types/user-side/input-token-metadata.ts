import { FileContent, COption } from '../shared';
import { StorageType } from '../infra-side/storage-metadata';
import { Uses } from '../infra-side/metaplex-datav2';
import { IAttribute, ICreators } from './input-nft-metadata';

export type InputTokenMetadata = {
  name: string;
  symbol: string;
  royalty: number;
  filePath: FileContent;
  storageType: StorageType;
  attributes?: IAttribute[];
  creators?: ICreators[];
  uses?: COption<Uses>;
};
