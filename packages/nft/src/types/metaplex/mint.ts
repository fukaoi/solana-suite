import { CreateNftInput } from '@metaplex-foundation/js';
import { NftStorageMetadata } from '../storage/';

type noNeedOptional =
  | 'payer'
  | 'owner'
  | 'associatedTokenProgram'
  | 'tokenProgram'
  | 'confirmOptions';

export type MetaplexMetaData = Omit<CreateNftInput, noNeedOptional>;

export type NftStorageMetaplexMetadata = Omit<
  NftStorageMetadata,
  'seller_fee_basis_points'
> &
  Omit<MetaplexMetaData, 'uri' | 'sellerFeeBasisPoints'> & {
    name: string;
    symbol: string;
    royalty: number;
    filePath: string | File;
    storageType: 'arweave' | 'nftStorage';
  };
