import { Currency, MetaplexFileContent } from '@metaplex-foundation/js';
import { Keypair } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { NftStorageMetadata } from '../types/storage';
import { ValidatorError } from '../validator';
export interface MetaplexFileOptions {
    readonly displayName: string;
    readonly uniqueName: string;
    readonly contentType: string | undefined;
    readonly extension: string | undefined;
    readonly tags: {
        name: string;
        value: string;
    }[];
}
export declare namespace StorageArweave {
    const getUploadPrice: (filePath: MetaplexFileContent, feePayer: Keypair) => Promise<Result<{
        price: number;
        currency: Currency;
    }, Error>>;
    const uploadContent: (filePath: MetaplexFileContent, feePayer: Keypair, fileOptions?: MetaplexFileOptions) => Promise<Result<string, Error>>;
    const uploadMetadata: (metadata: NftStorageMetadata, feePayer: Keypair) => Promise<Result<string, Error | ValidatorError>>;
}
