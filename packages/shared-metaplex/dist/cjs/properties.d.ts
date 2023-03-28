import { Secret, Result } from '@solana-suite/shared';
import { User, StorageType, Infra, FileContent } from './types';
export declare namespace Properties {
    const toConvertInfra: (input: User.Properties | undefined, storageFunc: (data: FileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>, storageType: StorageType, feePayer?: Secret) => Promise<Infra.Properties>;
}
