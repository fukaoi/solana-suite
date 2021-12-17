import { KeypairStr } from 'solana-suite';
export declare namespace Setup {
    const generatekeyPair: () => Promise<{
        source: KeypairStr;
        dest: KeypairStr;
    }>;
}
