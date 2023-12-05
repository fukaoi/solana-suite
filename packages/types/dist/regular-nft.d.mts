import { a as Option, C as Creators, U as Uses } from './mint-7437d5a6.js';
export { d as InputCollection, I as InputCreators, e as InputNftMetadata, O as Options, c as UseMethod, b as bignum } from './mint-7437d5a6.js';
import { Pubkey } from './account.mjs';
import { AuthorityOptions } from './shared.mjs';
import { Offchain } from './storage.mjs';
import 'bn.js';
import './find.mjs';
import './history.mjs';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.mjs';
import './converter.mjs';
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
type MintOptions = {
    freezeAuthority: Pubkey;
} & AuthorityOptions;

type MintCollectionOptions = {
    freezeAuthority: Pubkey;
    collectionSize: number;
} & AuthorityOptions;

export { Collection, CollectionDetails, Creators, GasLessMintOptions, MintCollectionOptions, MintOptions, Option, RegularNftMetadata, Uses };
