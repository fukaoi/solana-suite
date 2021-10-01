import { Storage } from './index';
export declare namespace StorageArweave {
    const upload: (payerSecret: string, storageData: Storage.Format) => Promise<string>;
}
