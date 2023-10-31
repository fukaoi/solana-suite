import { StorageType } from '../../storage';
import { bignum, Common } from '../common';
import { Pubkey } from '../../account';
import { FileType } from '../../storage';

export namespace UserInput {
  export type Collection = Pubkey;

  export type Creators = {
    address: Pubkey;
    share: number;
    verified: boolean;
  };

  export type Properties = Common.Properties;

  export enum TokenStandard {
    NonFungible = 0,
    FungibleAsset = 1,
    Fungible = 2,
    NonFungibleEdition = 3,
    ProgrammableNonFungible = 4,
  }

  export type NftMetadata = {
    name: string;
    symbol: string;
    royalty: number;
    storageType?: StorageType;
    filePath?: FileType;
    uri?: string;
    isMutable?: boolean;
    description?: string;
    external_url?: string;
    attributes?: Common.Attribute[];
    properties?: Properties;
    maxSupply?: bignum;
    creators?: Creators[];
    uses?: Common.Uses;
    collection?: Collection;
    options?: Common.Options;
  };

  export type TokenMetadata = {
    name: string;
    symbol: string;
    filePath?: FileType;
    uri?: string;
    storageType?: StorageType;
    description?: string;
    royalty?: number;
    uses?: Common.Uses;
    creators?: Creators[];
    attributes?: Common.Attribute[];
    options?: Common.Options;
  };
}
