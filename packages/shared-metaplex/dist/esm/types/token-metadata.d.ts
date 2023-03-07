import { MetaplexFileContent, Option } from '@metaplex-foundation/js';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
import { Pubkey } from '@solana-suite/shared';
import { JsonMetadataAttribute, InputCreators } from './nft-metadata';
import { StorageType } from './nft-storage-metadata';
export type InputTokenMetadata = {
    name: string;
    symbol: string;
    royalty: number;
    filePath: MetaplexFileContent;
    storageType: StorageType;
    attributes?: JsonMetadataAttribute[];
    creators?: InputCreators[];
    collection?: Option<Pubkey>;
    uses?: Option<Uses>;
};
export type TokenMetadata = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    attributes?: JsonMetadataAttribute[];
    creators?: InputCreators[];
    collection?: Option<Pubkey>;
    uses?: Option<Uses>;
};
