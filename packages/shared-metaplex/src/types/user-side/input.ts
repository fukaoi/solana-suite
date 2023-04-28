import { InfraSideInput } from '../infra-side/input';
import { bignum, FileContent, Option } from '../shared';
import { _Same } from '../_same';
import { Pubkey } from '@solana-suite/shared';

export namespace UserSideInput {
  export type Collection = Option<Pubkey> | undefined;

  export type Creators = Option<{
    address: Pubkey;
    share: number;
    verified: boolean;
  }> | undefined;
  export type Properties = _Same.Properties;

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
    attributes?: _Same.Attribute[];
    properties?: Properties;
    maxSupply?: bignum;
    creators?: Option<Creators[]>;
    uses?: _Same.Uses;
    collection?: Option<Collection>;
    options?: _Same.Options;
  };

  export type TokenMetadata = {
    name: string;
    symbol: string;
    filePath?: FileContent;
    uri?: string;
    storageType?: InfraSideInput.StorageType;
    description?: string;
    royalty?: number;
    uses?: Option<_Same.Uses>;
    creators?: Creators[];
    attributes?: _Same.Attribute[];
    options?: _Same.Options;
  };
}
