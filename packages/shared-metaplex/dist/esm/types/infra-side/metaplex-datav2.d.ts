import { PublicKey } from '@solana/web3.js';
import { UseMethod } from '@metaplex-foundation/mpl-token-metadata';
import { COption, bignum } from '../shared';
export type MetaplexDataV2 = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: COption<Creator[]>;
    collection: COption<Collection>;
    uses: COption<Uses>;
};
export type DataV2 = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: COption<Creator[]>;
    collection: COption<Collection>;
    uses: COption<Uses>;
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
export type Uses = {
    useMethod: UseMethod;
    remaining: bignum;
    total: bignum;
};
