import { KeypairStr } from '../../src';
export declare namespace Setup {
    const generatekeyPair: () => Promise<{
        source: KeypairStr;
        dest: KeypairStr;
    }>;
}
