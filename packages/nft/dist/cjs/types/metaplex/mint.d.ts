import { CreateNftInput, MetaplexFileContent, BigNumber, Option, Signer, CreatorInput } from '@metaplex-foundation/js';
import { PublicKey } from '@solana/web3.js';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
type noNeedOptional = 'payer' | 'owner' | 'associatedTokenProgram' | 'tokenProgram' | 'confirmOptions';
export type MetaplexNftMetaData = Omit<CreateNftInput, noNeedOptional>;
export type JsonMetadataAttribute = {
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
};
export type JsonMetadataProperties = {
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
export type InputNftMetadata = {
    name: string;
    symbol: string;
    royalty: number;
    filePath: MetaplexFileContent;
    storageType: 'arweave' | 'nftStorage';
    description?: string;
    external_url?: string;
    attributes?: JsonMetadataAttribute[];
    properties?: JsonMetadataProperties;
    isMutable?: boolean;
    maxSupply?: BigNumber;
    creators?: CreatorInput[];
    uses?: Option<Uses>;
    isCollection?: boolean;
    collection?: Option<PublicKey>;
    collectionAuthority?: Option<Signer>;
    collectionAuthorityIsDelegated?: boolean;
    collectionIsSized?: boolean;
    options?: {
        [key: string]: unknown;
    };
};
export {};