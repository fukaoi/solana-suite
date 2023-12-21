import { Pubkey, Secret } from './account.mjs';
import { Offchain } from './storage.mjs';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.mjs';
import './converter.mjs';
import '@metaplex-foundation/mpl-token-metadata';

type DelegateOptions = {
    delegate: Pubkey;
};

type MintOptions = {
    receiver: Pubkey;
    delegate: Pubkey;
    feePayer: Secret;
};

type MintCollectionOptions = {
    freezeAuthority: Pubkey;
    feePayer: Secret;
};

type Authority = {
    address: Pubkey;
    scopes: string[];
};
type Creators = {
    address: Pubkey;
    share: number;
    verified: boolean;
}[];
type CompressedNftMetadata = {
    page: number;
    total: number;
    limit: number;
    metadatas: NftMetadata[];
};
type NftMetadata = {
    mint: Pubkey;
    collectionMint: Pubkey;
    authorities: Authority[];
    royalty: number;
    name: string;
    symbol: string;
    uri: string;
    creators: Creators;
    treeAddress: Pubkey;
    isCompressed: boolean;
    isMutable: boolean;
    isBurn: boolean;
    editionNonce: number;
    primarySaleHappened: boolean;
    dateTime: Date;
    offchain: Offchain;
};

type SpaceOptions = {
    feePayer: Secret;
};
type SpaceNumber = 8 | 16000 | 100000 | 16700000 | 67000000 | 1000000000;

export { Authority, CompressedNftMetadata, Creators, DelegateOptions, MintCollectionOptions, MintOptions, NftMetadata, SpaceNumber, SpaceOptions };
