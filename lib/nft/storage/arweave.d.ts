import { MetadataStorageFormat } from './index';
export declare namespace StorageArweave {
    const upload: (payerSecret: string, storageData: MetadataStorageFormat) => Promise<string>;
}
