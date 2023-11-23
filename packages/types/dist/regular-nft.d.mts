import { O as Option, C as Creators, U as Uses } from './input-acdafc4a.js';
export { I as InputCollection, e as InputCreators, b as InputNftMetadata, a as Options, d as UseMethod, c as bignum } from './input-acdafc4a.js';
import { Pubkey } from './account.mjs';
import { Offchain } from './storage.mjs';
import 'bn.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.mjs';
import './converter.mjs';
import '@metaplex-foundation/mpl-token-metadata';

type Collection = {
    address: Pubkey;
    verified: boolean;
};
type CollectionDetails = {
    __kind: string;
    size: number;
};
type RegularNftMetadata = {
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
    collection?: Collection | undefined;
    collectionDetails?: CollectionDetails | undefined;
    creators?: Creators[] | undefined;
    uses?: Uses | undefined;
    dateTime?: Date | undefined;
};

export { Collection, CollectionDetails, Creators, Option, RegularNftMetadata, Uses };
