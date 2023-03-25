import { Uses } from '@metaplex-foundation/mpl-token-metadata';
import { Pubkey, Secret } from '@solana-suite/shared';
import { StorageType } from '../infra-side/storage-metadata';
import { COption, bignum, FileContent } from '../shared';

export type ICreators = {
  readonly address: Pubkey;
  readonly share: number;
  readonly authority?: Secret | undefined;
};

export type ICollection = COption<Pubkey>;

export type IAttribute = {
  trait_type?: string;
  value?: string;
  [key: string]: unknown;
};

export type IProperties = {
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

export type InputNftMetadata = {
  name: string;
  symbol: string;
  royalty: number;
  storageType: StorageType;
  filePath: FileContent; // todo: optional or uri?
  uri?: string;
  description?: string;
  external_url?: string;
  attributes?: IAttribute[];
  properties?: IProperties;
  isMutable?: boolean;
  maxSupply?: bignum;
  creators?: ICreators[];
  uses?: COption<Uses>;
  isCollection?: boolean;
  collection?: ICollection;
  options?: { [key: string]: unknown };
};
