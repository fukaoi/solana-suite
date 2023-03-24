import { CreateNftInput, MetaplexFileContent, BigNumber, Option, CreatorInput, PublicKey } from '@metaplex-foundation/js';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
import { Pubkey, Secret } from '@solana-suite/shared';
import { StorageType } from './nft-storage-metadata';
type noNeedOptional = 'payer' | 'owner' | 'associatedTokenProgram' | 'tokenProgram' | 'confirmOptions';
export type InputCreators = {
    readonly address: Pubkey;
    readonly share: number;
    readonly authority?: Secret | undefined;
};
export type OutputCreators = {
    readonly address: Pubkey;
    readonly share: number;
    readonly verified: boolean;
};
export type InputCollection = Option<Pubkey>;
export type OutputCollection = Option<{
    address: Pubkey;
    verified: boolean;
}>;
export type MetadataAttribute = {
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
};
export type MetadataProperties = {
    creators?: {
        address?: string;
        share?: number;
        [key: string]: unknown;
    }[];
    files?: {
        type?: string;
        filePath?: MetaplexFileContent;
        [key: string]: unknown;
    }[];
    [key: string]: unknown;
};

// todo: InputMetaplexMetadata
export type InputNftMetadata = {
    name: string;
    symbol: string;
    royalty: number;
    filePath: MetaplexFileContent;
    storageType: StorageType;
    description?: string;
    external_url?: string;
    attributes?: MetadataAttribute[];
    properties?: MetadataProperties;
    isMutable?: boolean;
    maxSupply?: BigNumber;
    creators?: InputCreators[];
    uses?: Option<Uses>;
    isCollection?: boolean;
    collection?: InputCollection;
    options?: {
        [key: string]: unknown;
    };
};
export type OutputNftMetadata = {
    mint: string;
    updateAuthority: string;
    royalty: number;
    name: string;
    symbol: string;
    uri: string;
    isMutable: boolean;
    primarySaleHappened: boolean;
    creators: OutputCreators[];
    editionNonce: Option<number>;
    collection: OutputCollection;
    uses: Option<Uses>;
};
export type _MetaplexNftMetaData = Omit<CreateNftInput, noNeedOptional>;
export type _InputCollection = Option<PublicKey>;
export type _OutputCollection = Option<{
    address: PublicKey;
    verified: boolean;
}>;
export type _MetadataProperties = {
    creators?: {
        address?: string;
        share?: number;
        [key: string]: unknown;
    }[];
    files?: {
        type?: string;
        uri?: string;
        [key: string]: unknown;
    }[];
    [key: string]: unknown;
};
export type _InputNftMetadata = Omit<InputNftMetadata, 'creators' | 'collection' | 'collectionAuthority' | 'properties'> & {
    creators?: CreatorInput[];
    collection?: _InputCollection;
    properties?: _MetadataProperties;
};
export {};
