import { COption } from '../shared';
import { IAttribute, ICreators } from './input-nft-metadata';
import { Uses } from '../infra-side/metaplex-datav2';

export type OutputTokenMetadata = {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  attributes?: IAttribute[];
  creators?: ICreators[];
  uses?: COption<Uses>;
};
