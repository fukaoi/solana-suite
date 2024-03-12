declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;
type Pubkey = (string & {
    [pubKeyNominality]: never;
}) | string;
type Secret = (string & {
    [secretNominality]: never;
}) | string;
type KeypairAccount = {
    pubkey: Pubkey;
    secret: Secret;
};
type OwnerInfo = {
    sol: number;
    lamports: number;
    owner: string;
};

export type { KeypairAccount, OwnerInfo, Pubkey, Secret };
