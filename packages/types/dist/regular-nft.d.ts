import { a as Option, C as Creators, U as Uses } from './mint-8aee5f82.js';
export { d as InputCollection, I as InputCreators, e as InputNftMetadata, O as Options, c as UseMethod, b as bignum } from './mint-8aee5f82.js';
import { Pubkey } from './account.js';
import { AuthorityOptions } from './shared.js';
import { Offchain } from './storage.js';
import 'bn.js';
import './find.js';
import './history.js';
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
type MintOptions = {
    freezeAuthority: Pubkey;
} & AuthorityOptions;

type MintCollectionOptions = {
    freezeAuthority: Pubkey;
    collectionSize: number;
} & AuthorityOptions;

export { Collection, CollectionDetails, Creators, GasLessMintOptions, MintCollectionOptions, MintOptions, Option, RegularNftMetadata, Uses };
