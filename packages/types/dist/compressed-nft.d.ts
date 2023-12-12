import { Pubkey, Secret } from './account.js';
import { Offchain } from './storage.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.js';
import './converter.js';
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

export { Authority, CompressedNftMetadata, Creators, DelegateOptions, MintCollectionOptions, MintOptions, NftMetadata, SpaceOptions };
