declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;

export type Pubkey = string & { [pubKeyNominality]: never };
export type Secret = string & { [secretNominality]: never };


