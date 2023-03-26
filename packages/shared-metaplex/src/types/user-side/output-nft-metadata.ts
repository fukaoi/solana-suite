import { Pubkey } from '@solana-suite/shared';
import { Option, User, _Common } from '../shared';

export type OCollection = Option<{ address: Pubkey; verified: boolean }>;

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
  collection: OCollection;
  uses: Option<_Common.Uses>;
};
