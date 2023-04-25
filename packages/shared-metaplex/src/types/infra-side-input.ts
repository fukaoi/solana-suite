import { bignum, Option, Shared } from './shared';
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

  /////////// OFFCHAIN  //////////////

  export type Offchain = {
    name?: string;
    symbol?: string;
    description?: string;
    seller_fee_basis_points?: number;
    image?: string;
    external_url?: string;
    attributes?: Shared.Attributes;
    properties?: Shared.Properties;
    collection?: Shared.Collection;
  };

  /////////// ONCHAIN  //////////////

  export declare enum UseMethod {
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

  export type MetaplexDataV2 = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Option<Shared.Creators>;
    collection: Option<{
      verified: boolean;
      key: PublicKey;
    }>;
    uses: Option<Shared.Uses>;
  };

  export type Onchain = {
    readonly model: 'metadata';
    readonly address: PublicKey;
    readonly mintAddress: PublicKey;
    readonly updateAuthorityAddress: PublicKey;
    readonly name: string;
    readonly symbol: string;
    readonly uri: string;
    readonly isMutable: boolean;
    readonly primarySaleHappened: boolean;
    readonly sellerFeeBasisPoints: number;
    readonly editionNonce: Option<number>;
    readonly creators: Option<Shared.Creators>;
    readonly tokenStandard: Option<TokenStandard>;
    readonly collection: Option<{
      address: PublicKey;
      verified: boolean;
    }>;
    readonly collectionDetails: Option<{
      version: 'V1';
      size: bignum;
    }>;
    readonly uses: Option<Shared.Uses>;
  };
}