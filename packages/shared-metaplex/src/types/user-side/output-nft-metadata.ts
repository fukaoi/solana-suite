import { Pubkey } from '@solana-suite/shared';
import { Uses } from '../infra-side/metaplex-datav2';
import { COption } from '../shared';

export type OCreators = {
  readonly address: Pubkey;
  readonly share: number;
  readonly verified: boolean;
};

export type OCollection = COption<{ address: Pubkey; verified: boolean }>;

export type OutputNftMetadata = {
  mint: string;
  updateAuthority: string;
  royalty: number;
  name: string;
  symbol: string;
  uri: string;
  isMutable: boolean;
  primarySaleHappened: boolean;
  creators: OCreators[];
  editionNonce: COption<number>;
  collection: OCollection;
  uses: COption<Uses>;
};
