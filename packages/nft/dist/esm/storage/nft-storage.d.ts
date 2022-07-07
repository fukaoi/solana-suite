import { Result } from '@solana-suite/shared';
import { JsonMetadata } from '@metaplex-foundation/js';
export declare namespace StorageNftStorage {
    const uploadContent: (filePath: string | File) => Promise<Result<string, Error>>;
    const uploadMetadata: (metadata: JsonMetadata) => Promise<Result<string, Error>>;
}
