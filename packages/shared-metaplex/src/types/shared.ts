import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';

export type Option<T> = T | null;
export type bignum = number | BN;
export type FileContent = string | Buffer | Uint8Array | ArrayBuffer;

// Common types
export namespace Shared {
  export type Uses = {
    useMethod: UseMethod;
    remaining: bignum;
    total: bignum;
  };

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

  export enum UseMethod {
    Burn = 0,
    Multiple = 1,
    Single = 2,
  }

  export type Collection = {
    name?: string;
    family?: string;
    [key: string]: unknown;
  };

  export type Creators = {
    readonly address: PublicKey;
    readonly share: number;
    readonly verified: boolean;
  }[];

  export type Attributes = {
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
  }[];

  export type Options = {
    options?: { [key: string]: unknown };
  };
}
