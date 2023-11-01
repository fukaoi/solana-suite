import BN from 'bn.js';

export type Collection = Pubkey;

export type bignum = number | BN;

export type Option<T> = T | null;

export enum UseMethod {
  Burn = 0,
  Multiple = 1,
  Single = 2,
}

export type Uses = {
  useMethod: UseMethod;
  remaining: bignum;
  total: bignum;
};

export type Creators = {
  address: Pubkey;
  share: number;
  verified: boolean;
};
