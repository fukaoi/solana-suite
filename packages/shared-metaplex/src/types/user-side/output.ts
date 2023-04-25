import { _Common, Option, User } from '../shared';

/////////// NFT //////////////
export module UserSide.Output {
  export type NftMetadata = {
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
}

/////////// TOKEN //////////////
export namespace UserSide.Output {
  export type TokenMetadata = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    attributes?: User.Attribute[];
    creators?: User.Creators[];
    uses?: Option<_Common.Uses>;
  };
}
