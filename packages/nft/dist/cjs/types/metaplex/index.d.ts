import { CreateNftInput, Nft, MetaplexFileContent, BigNumber, Option, Signer, CreatorInput } from '@metaplex-foundation/js';
import { PublicKey } from '@solana/web3.js';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
declare type noNeedOptional = 'payer' | 'owner' | 'associatedTokenProgram' | 'tokenProgram' | 'confirmOptions';
export declare type MetaplexMetaData = Omit<CreateNftInput, noNeedOptional>;
export declare type JsonMetadataAttribute = {
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
};
export declare type JsonMetadataProperties = {
    creators?: Array<{
        address?: string;
        share?: number;
        [key: string]: unknown;
    }>;
    files?: Array<{
        type?: string;
        uri?: string;
        [key: string]: unknown;
    }>;
    [key: string]: unknown;
};
export declare type InputMetaplexMetadata = {
    name: string;
    symbol: string;
    royalty: number;
    filePath: MetaplexFileContent;
    storageType: 'arweave' | 'nftStorage';
    description?: string;
    external_url?: string;
    image?: string;
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
};
export declare type OutputMetaplexMetadata = Omit<Nft, 'mint' | 'updateAuthority' | 'metadataAccount' | 'metadataTask' | 'editionAccount' | 'editionTask' | 'sellerFeeBasisPoints' | 'metadata' | 'originalEdition' | 'printEdition' | 'isOriginal' | 'isPrint' | 'equals'> & {
    mint: string;
    updateAuthority: string;
    royalty: number;
};
export {};
