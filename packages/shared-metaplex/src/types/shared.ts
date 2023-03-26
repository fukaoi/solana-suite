import BN from 'bn.js';
import { Pubkey } from '@solana-suite/shared';
import { PublicKey } from '@solana/web3.js';

export type Option<T> = T | null;
export type bignum = number | BN;
export type FileContent = string | Buffer | Uint8Array | ArrayBuffer;

// Common types
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
}

// To Solana, Decentrized storage
export namespace Infra {
  export namespace Input {
    export type Collection = Option<{
      verified: boolean;
      key: PublicKey;
    }>;
  }
  export namespace Output {
    export type Collection = Option<{
      address: PublicKey;
      verified: boolean;
    }>;
  }

  export type Properties = _Common.Properties;

  export type Creators = {
    readonly address: PublicKey;
    readonly share: number;
    readonly verified: boolean;
  };

  export type Attribute = {
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
  };
}

// To User application, Web service
export namespace User {
  export namespace Input {
    export type Collection = Option<Pubkey>;
  }

  export namespace Output {
    export type Collection = Option<{ address: Pubkey; verified: boolean }>;
  }

  export type Properties = _Common.Properties;

  export type Creators = {
    readonly address: Pubkey;
    readonly share: number;
    readonly verified: boolean;
  };

  export type Attribute = {
    trait_type?: string;
    value?: string;
    [key: string]: unknown;
  };
}
