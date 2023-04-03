import { _Common, Option, User } from '../shared';
export type OutputTokenMetadata = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    attributes?: User.Attribute[];
    creators?: User.Creators[];
    uses?: Option<_Common.Uses>;
};
