import { Result, Secret } from '@solana-suite/shared';
import { FileContent, InfraSideInput, UserSideInput, StorageType } from '../types';
export declare namespace Convert.Properties {
    const intoInfraSide: (input: UserSideInput.Properties | undefined, storageFunc: (data: FileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>, storageType: StorageType, feePayer?: Secret) => Promise<InfraSideInput.Properties>;
}
//# sourceMappingURL=properties.d.ts.map