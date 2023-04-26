import { InfraSideInput } from '../infra-side/input';
import { bignum, FileContent, Option, Shared } from '../shared';
import { Pubkey } from '@solana-suite/shared';

export namespace UserSideInput {
  export type Collection = Option<Pubkey>;
  export type Creator = {
    readonly address: Pubkey;
    readonly share: number;
    readonly verified: boolean;
  };
  export type Properties = Shared.Properties;

  /////////// NFT //////////////
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
    attributes?: Shared.Attribute;
    properties?: Properties;
    maxSupply?: bignum;
    creators?: Creator[];
    uses?: Shared.Uses;
    collection?: Option<Pubkey>;
    options?: Shared.Options;
  };

  /////////// TOKEN //////////////
  export type TokenMetadata = {
    name: string;
    symbol: string;
    filePath?: FileContent;
    uri?: string;
    storageType?: InfraSideInput.StorageType;
    description?: string;
    royalty?: number;
    uses?: Option<Shared.Uses>;
    creators?: Creator[];
    attributes?: Shared.Attribute;
    options?: Shared.Options;
  };
}
