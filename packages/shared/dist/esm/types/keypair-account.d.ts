declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;
export type Pubkey = string & {
    [pubKeyNominality]: never;
} | string;
export type Secret = string & {
    [secretNominality]: never;
} | string;
export {};
//# sourceMappingURL=keypair-account.d.ts.map