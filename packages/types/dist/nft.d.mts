import { Pubkey } from './account.mjs';
import { Offchain } from './storage.mjs';
import '@solana/web3.js';
import './phantom-aWSz-JUw.mjs';
import './das-api.mjs';
import './converter.mjs';
import '@metaplex-foundation/mpl-token-metadata';

type Authority = {
    address: Pubkey;
    scopes: string[];
};
type Creators = {
    address: Pubkey;
    share: number;
    verified: boolean;
}[];
type Metadata = {
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
type NftMetadata = {
    page: number;
    total: number;
    limit: number;
    metadatas: Metadata[];
};

export type { Authority, Creators, Metadata, NftMetadata };
