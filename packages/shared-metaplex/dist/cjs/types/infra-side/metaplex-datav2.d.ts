import { PublicKey } from '@solana/web3.js';
import { Option, _Common } from '../shared';
export type MetaplexDataV2 = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Option<Creator[]>;
    collection: Option<Collection>;
    uses: Option<_Common.Uses>;
};
export type DataV2 = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Option<Creator[]>;
    collection: Option<Collection>;
    uses: Option<_Common.Uses>;
};
export type Creator = {
    address: PublicKey;
    verified: boolean;
    share: number;
};
export type Collection = {
    verified: boolean;
    key: PublicKey;
};
