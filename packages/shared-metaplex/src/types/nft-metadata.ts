import {
  CreateNftInput,
  MetaplexFileContent,
  BigNumber,
  Option,
  CreatorInput,
} from '@metaplex-foundation/js';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
import { Pubkey, Secret } from '@solana-suite/shared';
import { StorageType } from './nft-storage-metadata';

type noNeedOptional =
  | 'payer'
  | 'owner'
  | 'associatedTokenProgram'
  | 'tokenProgram'
  | 'confirmOptions';

export type InputCreators = {
  readonly address: Pubkey;
  readonly share: number;
  readonly authority?: Secret | undefined;
};

export type OutputCreators = {
  readonly address: Pubkey;
  readonly share: number;
  readonly verified: boolean;
};

export type JsonMetadataAttribute = {
  trait_type?: string;
  value?: string;
  [key: string]: unknown;
};

export type JsonMetadataProperties = {
  creators?: {
    address?: string;
    share?: number;
    [key: string]: unknown;
  }[];
  files?: {
    type?: string;
    uri?: string;
    [key: string]: unknown;
  }[];
  [key: string]: unknown;
};

export type InputNftMetadata = {
  name: string;
  symbol: string;
  royalty: number;
  filePath: MetaplexFileContent;
  storageType: StorageType;
  description?: string;
  external_url?: string;
  attributes?: JsonMetadataAttribute[];
  properties?: JsonMetadataProperties;
  isMutable?: boolean;
  maxSupply?: BigNumber;
  creators?: InputCreators[];
  uses?: Option<Uses>;
  // isCollection?: boolean;
  // collection?: Option<Pubkey>;
  // collectionAuthority?: Option<Secret>;
  // collectionAuthorityIsDelegated?: boolean;
  // collectionIsSized?: boolean;
  options?: { [key: string]: unknown };
};

export type OutputNftMetadata = {
  mint: string;
  updateAuthority: string;
  royalty: number;
  name: string;
  symbol: string;
  uri: string;
  isMutable: boolean;
  primarySaleHappened: boolean;
  creators: OutputCreators[];
  editionNonce: Option<number>;
  collection: Option<{ address: Pubkey; verified: boolean }>;
  uses: Option<Uses>;
};

//---- Internal type ----//
export type _MetaplexNftMetaData = Omit<CreateNftInput, noNeedOptional>;
export type _InputNftMetadata = Omit<InputNftMetadata, 'creators'> & {
  creators: CreatorInput[];
};
