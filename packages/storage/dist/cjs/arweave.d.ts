import { Currency, MetaplexFileContent } from '@metaplex-foundation/js';
import { Result, Secret } from '@solana-suite/shared';
import { StorageMetadata } from '@solana-suite/shared-metaplex';
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
export declare namespace Arweave {
    const getUploadPrice: (filePath: MetaplexFileContent, feePayer: Secret) => Promise<Result<{
        price: number;
        currency: Currency;
    }, Error>>;
    const uploadContent: (filePath: MetaplexFileContent, feePayer: Secret, fileOptions?: MetaplexFileOptions) => Promise<Result<string, Error>>;
    const uploadMetadata: (metadata: StorageMetadata, feePayer: Secret) => Promise<Result<string, Error>>;
}
