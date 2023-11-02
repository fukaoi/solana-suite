declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;

export type Pubkey = (string & { [pubKeyNominality]: never }) | string;
export type Secret = (string & { [secretNominality]: never }) | string;
export type KeypairAccount = {
  pubkey: Pubkey;
  secret: Secret;
};
export type OwnerInfo = {
  sol: number;
  lamports: number;
  owner: string;
};
