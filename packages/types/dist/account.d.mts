declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;
type Pubkey = (string & {
    [pubKeyNominality]: never;
}) | string;
type Secret = (string & {
    [secretNominality]: never;
}) | string;
type OwnerInfo = {
    sol: number;
    lamports: number;
    owner: string;
};

export { OwnerInfo, Pubkey, Secret };
