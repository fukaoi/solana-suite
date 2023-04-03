import { Option, User, _Common } from '../shared';

export type OutputNftMetadata = {
  mint: string;
  updateAuthority: string;
  royalty: number;
  name: string;
  symbol: string;
  uri: string;
  isMutable: boolean;
  primarySaleHappened: boolean;
  creators: User.Creators[];
  editionNonce: Option<number>;
  collection: User.Output.Collection;
  uses: Option<_Common.Uses>;
};
