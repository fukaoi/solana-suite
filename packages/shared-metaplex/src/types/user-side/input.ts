import { InfraSideInput } from '../infra-side/input';
import { _Shared, bignum, FileContent } from '../shared';
import { Pubkey } from '@solana-suite/shared';

export namespace UserSideInput {
  export type Collection = Pubkey;

  export type Creators = {
    address: Pubkey;
    share: number;
    verified: boolean;
  };

  export type Properties = _Shared.Properties;

  export type NftMetadata = {
    name: string;
    symbol: string;
    royalty: number;
    storageType?: InfraSideInput.StorageType;
    filePath?: FileContent;
    uri?: string;
    isMutable?: boolean;
    description?: string;
    external_url?: string;
    attributes?: _Shared.Attribute[];
    properties?: Properties;
    maxSupply?: bignum;
    creators?: Creators[];
    uses?: _Shared.Uses;
    collection?: Collection;
    options?: _Shared.Options;
  };

  export type TokenMetadata = {
    name: string;
    symbol: string;
    filePath?: FileContent;
    uri?: string;
    storageType?: InfraSideInput.StorageType;
    description?: string;
    royalty?: number;
    uses?: _Shared.Uses;
    creators?: Creators[];
    attributes?: _Shared.Attribute[];
    options?: _Shared.Options;
  };
}
