import { a as Option, C as Creators, U as Uses } from './mint-d52499d3.js';
export { d as InputCollection, I as InputCreators, e as InputNftMetadata, M as MintOptions, O as Options, c as UseMethod, b as bignum } from './mint-d52499d3.js';
import { Pubkey, Secret } from './account.js';
import { Offchain } from './storage.js';
import 'bn.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.js';
import './converter.js';
import '@metaplex-foundation/mpl-token-metadata';

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

export { Collection, CollectionDetails, Creators, GasLessMintOptions, MintCollectionOptions, Option, RegularNftMetadata, Uses };
