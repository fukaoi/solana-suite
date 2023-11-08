import { Pubkey } from './account.js';
import { StorageType, FileType, Attribute, Properties, Offchain } from './storage.js';
import { InternalCreators, InternalCollection } from './converter.js';
import BN from 'bn.js';
import '@solana/web3.js';
import './phantom-e9a40784.js';
import '@metaplex-foundation/mpl-token-metadata';

type bignum = number | BN;
type Option<T> = T | null;
declare enum UseMethod {
    Burn = 0,
    Multiple = 1,
    Single = 2
}
type Uses = {
    useMethod: UseMethod;
    remaining: bignum;
    total: bignum;
};
type Creators = {
    address: Pubkey;
    share: number;
    verified: boolean;
};

type InputCollection = Pubkey;
type Options = {
    [key: string]: unknown;
};
type MetaplexDataV2 = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Option<InternalCreators[]>;
    collection: Option<InternalCollection>;
    uses: Option<Uses>;
};
declare enum TokenStandard {
    NonFungible = 0,
    FungibleAsset = 1,
    Fungible = 2,
    NonFungibleEdition = 3,
    ProgrammableNonFungible = 4
}
type InputNftMetadata = {
    name: string;
    symbol: string;
    royalty: number;
    storageType: StorageType;
    filePath?: FileType;
    uri?: string;
    isMutable?: boolean;
    description?: string;
    external_url?: string;
    attributes?: Attribute[];
    properties?: Properties;
    maxSupply?: bignum;
    creators?: Creators[];
    uses?: Uses;
    collection?: InputCollection;
    options?: Options;
};

type Collection = {
    address: Pubkey;
    verified: boolean;
};
type CollectionDetails = {
    __kind: string;
    size: number;
};
type NftMetadata = {
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
    tokenAmount: string;
    collection?: Collection | undefined;
    collectionDetails?: CollectionDetails | undefined;
    creators?: Creators[] | undefined;
    uses?: Uses | undefined;
    dateTime?: Date | undefined;
};
type TokenMetadata = {
    mint: string;
    name: string;
    symbol: string;
    uri: string;
    royalty: number;
    offchain: Offchain;
    tokenAmount: string;
    attributes?: Attribute | undefined;
    creators?: Creators[] | undefined;
    uses?: Uses | undefined;
    dateTime?: Date | undefined;
};

export { Collection, CollectionDetails, Creators, InputCollection, InputNftMetadata, MetaplexDataV2, NftMetadata, Option, Options, TokenMetadata, TokenStandard, UseMethod, Uses, bignum };
