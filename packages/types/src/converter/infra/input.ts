import { Common, Option } from '../common';
import { PublicKey } from '@solana/web3.js';

export namespace InfraInput {
  export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
  }

  export type StorageNftStorageMetadata = {
    storageType?: 'nftStorage';
  };

  export type StorageArweaveMetadata = {
    storageType?: 'arweave';
  };

  export type Collection = {
    key: PublicKey;
    verified: boolean;
  };

  export type Creators = {
    address: PublicKey;
    verified: boolean;
    share: number;
  };

  export type Properties = Common.Properties;

  // Not need use Option type. bucasue Metaplex.JsonMetadata is same
  export type Offchain = {
    name?: string;
    symbol?: string;
    description?: string;
    seller_fee_basis_points?: number;
    image?: string;
    external_url?: string;
    attributes?: Common.Attribute[];
    properties?: Common.Properties;
    collection?: {
      name?: string;
      family?: string;
      [key: string]: unknown;
    };
    created_at?: number;
  };

  export type MetaplexDataV2 = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Option<Creators[]>;
    collection: Option<Collection>;
    uses: Option<Common.Uses>;
  };
}
