import { Keypair } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
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
    const uploadContent: (payer: Keypair, filePath: string, fileName: string, fileOptions?: MetaplexFileOptions) => Promise<Result<string, Error>>;
}
