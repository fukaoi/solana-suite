export * from './mint';

import {
  CreateNftInput,
} from '@metaplex-foundation/js';

import {
  NftStorageMetadata
} from '../storage';

type noNeedOptional =
  'confirmOptions' |
  'payer' |
  'associatedTokenProgram' |
  'tokenProgram';

export type MetaplexMetadata = Omit<CreateNftInput, noNeedOptional>;

export type NftStorageMetaplexMetadata = NftStorageMetadata & MetaplexMetadata & {
  filePath: string | File
};

