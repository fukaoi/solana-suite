import { c as Option, C as Creators, d as Uses } from './input-4b25dc34.js';
export { I as InputCollection, e as InputCreators, a as InputNftMetadata, O as Options, U as UseMethod, b as bignum } from './input-4b25dc34.js';
import { Pubkey } from './account.js';
import { Offchain, Attribute } from './storage.js';
import 'bn.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import '@metaplex-foundation/mpl-token-metadata';

type Collection = {
    address: Pubkey;
    verified: boolean;
};
type CollectionDetails = {
    __kind: string;
    size: number;
};
type NftMetadata = {
    mint: string;
    updateAuthority: string;
    royalty: number;
    name: string;
    symbol: string;
    uri: string;
    isMutable: boolean;
    primarySaleHappened: boolean;
    editionNonce: Option<number>;
    offchain: Offchain;
    tokenAmount: string;
    collection?: Collection | undefined;
    collectionDetails?: CollectionDetails | undefined;
    creators?: Creators[] | undefined;
    uses?: Uses | undefined;
    dateTime?: Date | undefined;
};
type TokenMetadata = {
    mint: string;
    name: string;
    symbol: string;
    uri: string;
    royalty: number;
    offchain: Offchain;
    tokenAmount: string;
    attributes?: Attribute | undefined;
    creators?: Creators[] | undefined;
    uses?: Uses | undefined;
    dateTime?: Date | undefined;
};

export { Collection, CollectionDetails, Creators, NftMetadata, Option, TokenMetadata, Uses };
