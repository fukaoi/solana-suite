import BN from 'bn.js';

export type Option<T> = T | null;
export type bignum = number | BN;
export type FileContent = string | Buffer | Uint8Array | ArrayBuffer;

export namespace _Shared {
  export type Properties = {
    creators?: {
      address?: string;
      share?: number;
      [key: string]: unknown;
    }[];
    files?: {
      type?: string;
      filePath?: FileContent;
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
