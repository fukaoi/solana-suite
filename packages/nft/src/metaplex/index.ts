export * from './mint';

import {
  CreateNftInput,
} from '@metaplex-foundation/js';

import {
  NftStorageMetadata
} from '../storage';

type noNeedOptional =
  'payer' |
  'owner' |
  'associatedTokenProgram' |
  'tokenProgram' |
  'confirmOptions'; 

export type MetaplexMetadata = Omit<CreateNftInput, noNeedOptional>;

export type NftStorageMetaplexMetadata = NftStorageMetadata & MetaplexMetadata & {
  filePath: string | File
};

