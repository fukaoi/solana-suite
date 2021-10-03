import { Keypair } from '@solana/web3.js';
import { Storage } from './index';
export declare namespace StorageArweave {
    const upload: (payer: Keypair, storageData: Storage.Format) => Promise<string>;
}
