import { bignum, FileContent } from './shared';

export namespace _Same {
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

  export enum TokenStandard {
    NonFungible = 0,
    FungibleAsset = 1,
    Fungible = 2,
    NonFungibleEdition = 3,
    ProgrammableNonFungible = 4,
  }

  export type Uses = {
    useMethod: UseMethod;
    remaining: bignum;
    total: bignum;
  };

  export type Options = { [key: string]: unknown };
}
