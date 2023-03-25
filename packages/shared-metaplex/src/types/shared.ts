import BN from 'bn.js';
import { Pubkey } from '@solana-suite/shared';

export type COption<T> = T | null;
export type bignum = number | BN;
export type FileContent = string | Buffer | Uint8Array | ArrayBuffer;

export namespace _Common {
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

  export type Collection = {
    name?: string;
    family?: string;
    [key: string]: unknown;
  };

  export type Creators = {
    readonly address: Pubkey;
    readonly share: number;
    readonly verified: boolean;
  };

  export enum UseMethod {
    Burn = 0,
    Multiple = 1,
    Single = 2,
  }
}

export namespace Infra {
  export type Collection = COption<Pubkey>;
  export type Creators = _Common.Creators;
  export type Properties = _Common.Properties;

  export type Attribute = {
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
  };
}

export namespace User {
  export type Collection = COption<Pubkey>;
  export type Creators = _Common.Creators;
  export type Properties = _Common.Properties;

  export type Attribute = {
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
  };
}
