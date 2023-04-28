import { Option } from '../shared';
import { _Same } from '../_same';
import { PublicKey } from '@solana/web3.js';

export namespace InfraSideInput {
  export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
  }

  export type StorageType = 'nftStorage' | 'arweave';

  export type StorageNftStorageMetadata = {
    storageType?: 'nftStorage';
  };

  export type StorageArweaveMetadata = {
    storageType?: 'arweave';
  };

  export type Collection = Option<{
    key: PublicKey;
    verified: boolean;
  }>;

  export type Creators = Option<{
    address: PublicKey;
    verified: boolean;
    share: number;
  }>;

  export type Properties = _Same.Properties;

  export type Offchain = {
    name?: string;
    symbol?: string;
    description?: string;
    seller_fee_basis_points?: number;
    image?: string;
    external_url?: string;
    attributes?: _Same.Attribute[];
    properties?: _Same.Properties;
    collection?: {
      name?: string;
      family?: string;
      [key: string]: unknown;
    };
  };

  export type MetaplexDataV2 = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Creators[];
    collection: Collection;
    uses: _Same.Uses;
  };
}
