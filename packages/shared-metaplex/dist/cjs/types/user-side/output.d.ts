import { _Common, Option, User } from '../shared';
export declare module UserSide.Output {
    type NftMetadata = {
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
export declare namespace UserSide.Output {
    type TokenMetadata = {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        attributes?: User.Attribute[];
        creators?: User.Creators[];
        uses?: Option<_Common.Uses>;
    };
}
