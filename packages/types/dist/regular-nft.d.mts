import { Secret, Pubkey } from './account.mjs';
import { a as Option, C as Creators, U as Uses } from './mint-74b505a0.js';
export { d as InputCollection, I as InputCreators, e as InputNftMetadata, M as MintOptions, O as Options, c as UseMethod, b as bignum } from './mint-74b505a0.js';
import { Offchain } from './storage.mjs';
import 'bn.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.mjs';
import './converter.mjs';
import '@metaplex-foundation/mpl-token-metadata';

type BurnOptions = {
    feePayer: Secret;
};

type GasLessMintOptions = {
    freezeAuthority: Pubkey;
};

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

type MintCollectionOptions = {
    feePayer: Secret;
    freezeAuthority: Pubkey;
    collectionSize: number;
};

type ThawOptions = {
    feePayer: Secret;
};

type TransferOptions = {
    feePayer: Secret;
};

export { BurnOptions, Collection, CollectionDetails, Creators, GasLessMintOptions, MintCollectionOptions, Option, RegularNftMetadata, ThawOptions, TransferOptions, Uses };
