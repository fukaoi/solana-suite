import { Result } from '@solana-suite/shared';
import { JsonMetadata } from '@metaplex-foundation/js';
export declare namespace StorageNftStorage {
    const uploadContent: (filePath: string) => Promise<Result<string, Error>>;
    const uploadMetadata: (input: JsonMetadata) => Promise<Result<string, Error>>;
}
