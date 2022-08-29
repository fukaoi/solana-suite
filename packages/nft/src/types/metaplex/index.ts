import { CreateNftInput, Nft } from '@metaplex-foundation/js';
import { NftStorageMetadata } from '../storage/';

type noNeedOptional =
  | 'payer'
  | 'owner'
  | 'associatedTokenProgram'
  | 'tokenProgram'
  | 'confirmOptions';

export type MetaplexMetaData = Omit<CreateNftInput, noNeedOptional>;

export type InputMetaplexMetadata = Omit<
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

export type OutputMetaplexMetadata = Omit<
  Nft,
  | 'mint'
  | 'updateAuthority'
  | 'metadataAccount'
  | 'metadataTask'
  | 'editionAccount'
  | 'editionTask'
  | 'sellerFeeBasisPoints'
  | 'metadata'
  | 'originalEdition'
  | 'printEdition'
  | 'isOriginal'
  | 'isPrint'
  | 'equals'
> & {
  mint: string;
  updateAuthority: string;
  royalty: number;
};
