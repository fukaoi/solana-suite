import { InfraSideInput } from '../infra-side/input';
import { bignum, FileContent, Option } from '../shared';
import { _Same } from '../_same';
import { Pubkey } from '@solana-suite/shared';

export namespace UserSideInput {
  export type Collection = Option<Pubkey>;
  
  export type Creator = {
    readonly address: Pubkey;
    readonly share: number;
    readonly verified: boolean;
  };
  
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
    attributes?: _Same.Attribute;
    properties?: Properties;
    maxSupply?: bignum;
    creators?: Creator[];
    uses?: _Same.Uses;
    collection?: Option<Pubkey>;
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
    creators?: Creator[];
    attributes?: _Same.Attribute;
    options?: _Same.Options;
  };
}
