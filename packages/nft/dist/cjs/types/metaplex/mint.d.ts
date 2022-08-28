import { CreateNftInput } from '@metaplex-foundation/js';
import { NftStorageMetadata } from '../storage/';
declare type noNeedOptional = 'payer' | 'owner' | 'associatedTokenProgram' | 'tokenProgram' | 'confirmOptions';
export declare type MetaplexMetaData = Omit<CreateNftInput, noNeedOptional>;
export declare type NftStorageMetaplexMetadata = Omit<NftStorageMetadata, 'seller_fee_basis_points'> & Omit<MetaplexMetaData, 'uri' | 'sellerFeeBasisPoints'> & {
    name: string;
    symbol: string;
    royalty: number;
    filePath: string | File;
    storageType: 'arweave' | 'nftStorage';
};
export {};
