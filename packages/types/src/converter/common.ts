import BN from 'bn.js';
import {FileType} from '../storage';

export type Option<T> = T | null;
export type bignum = number | BN;

export namespace Common {
  export type Properties = {
    creators?: {
      address?: string;
      share?: number;
      [key: string]: unknown;
    }[];
    files?: {
      type?: string;
      filePath?: FileType;
      [key: string]: unknown;
    }[];
    [key: string]: unknown;
  };

  export type Attribute = {
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
  };

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

  export type Options = { [key: string]: unknown };
}
