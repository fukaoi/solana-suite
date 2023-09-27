import { KeypairAccount } from '../src/';
export declare namespace Setup {
    const generateKeyPair: () => Promise<{
        source: KeypairAccount;
        dest: KeypairAccount;
    }>;
}
