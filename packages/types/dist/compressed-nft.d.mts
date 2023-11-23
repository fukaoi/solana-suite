import { Pubkey } from './account.mjs';
import { c as AuthorityOptions } from './shared-e7a4e323.js';
import { Offchain } from './storage.mjs';
import './find.mjs';
import './history.mjs';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.mjs';
import './converter.mjs';
import '@metaplex-foundation/mpl-token-metadata';

type MintOptions = {
    receiver: Pubkey;
    delegate: Pubkey;
} & AuthorityOptions;

type MintCollectionOptions = {
    freezeAuthority: Pubkey;
} & AuthorityOptions;

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

export { Authority, CompressedNftMetadata, Creators, MintCollectionOptions, MintOptions, NftMetadata };
