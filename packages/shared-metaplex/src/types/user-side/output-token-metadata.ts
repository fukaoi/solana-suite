import { _Common, COption, User } from '../shared';

export type OutputTokenMetadata = {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  attributes?: User.Attribute[];
  creators?: User.Creators[];
  uses?: COption<_Common.Uses>;
};
