import { Result, Secret } from '@solana-suite/shared';
import { FileContent, InfraSideInput, UserSideInput } from './types';
export declare namespace Properties {
    const toConvertInfra: (input: UserSideInput.Properties | undefined, storageFunc: (data: FileContent, storageType: InfraSideInput.StorageType, feePayer?: Secret) => Promise<Result<string, Error>>, storageType: InfraSideInput.StorageType, feePayer?: Secret) => Promise<InfraSideInput.Properties>;
}
