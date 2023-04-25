import { Option, Shared } from '../shared';
import { Pubkey } from '@solana-suite/shared';

export namespace UserSideOutput {
  /////////// NFT //////////////
  export type NftMetadata = {
    mint: string;
    updateAuthority: string;
    royalty: number;
    name: string;
    symbol: string;
    uri: string;
    isMutable: boolean;
    primarySaleHappened: boolean;
    creators: Shared.Creators;
    editionNonce: Option<number>;
    collection: Option<{ address: Pubkey; verified: boolean }>;
    uses: Option<Shared.Uses>;
  };

  /////////// TOKEN //////////////
  export type TokenMetadata = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    attributes?: Shared.Attributes;
    creators?: Shared.Creators;
    uses?: Option<Shared.Uses>;
  };
}
