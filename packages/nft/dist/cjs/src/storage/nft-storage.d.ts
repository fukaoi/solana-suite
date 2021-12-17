import { Result } from '@solana-suite/shared';
import { Storage } from './index';
export declare namespace StorageNftStorage {
    const upload: (storageData: Storage.Format) => Promise<Result<string, Error>>;
}
