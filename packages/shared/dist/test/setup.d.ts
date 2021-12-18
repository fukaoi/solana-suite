declare class KeypairStr {
    pubkey: string;
    secret: string;
    constructor(pubkey: string, secret: string);
}
export declare namespace Setup {
    const generatekeyPair: () => Promise<{
        source: KeypairStr;
        dest: KeypairStr;
    }>;
}
export {};
