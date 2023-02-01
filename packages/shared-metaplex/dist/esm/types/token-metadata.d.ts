import { MetaplexFileContent, Option, CreatorInput } from '@metaplex-foundation/js';
import { PublicKey } from '@solana/web3.js';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
import { JsonMetadataAttribute } from './nft-metadata';
import { StorageType } from './nft-storage-metadata';
export type InputTokenMetadata = {
    name: string;
    symbol: string;
    royalty: number;
    filePath: MetaplexFileContent;
    storageType: StorageType;
    attributes?: JsonMetadataAttribute[];
    creators?: CreatorInput[];
    collection?: Option<PublicKey>;
    uses?: Option<Uses>;
};
export type TokenMetadata = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    attributes?: JsonMetadataAttribute[];
    creators?: CreatorInput[];
    collection?: Option<PublicKey>;
    uses?: Option<Uses>;
};
