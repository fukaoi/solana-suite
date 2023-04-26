import { Option, Shared } from '../shared';
import { Pubkey } from '@solana-suite/shared';

export namespace UserSideOutput {
  export type Collection = Option<{ address: Pubkey; verified: boolean }>;
  export type Creator = Shared.Creator;
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
    creators: Shared.Creator[];
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
    attributes?: Shared.Attribute;
    creators?: Shared.Creator[];
    uses?: Option<Shared.Uses>;
  };
}
