import { Pubkey } from './account.js';
import { c as AuthorityOptions } from './shared-ecb29866.js';
import { Offchain } from './storage.js';
import './find.js';
import './history.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import './das-api.js';
import './converter.js';
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
