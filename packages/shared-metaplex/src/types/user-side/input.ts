import { InfraSideInput } from '../infra-side/input';
import { bignum, FileContent, Option, Shared } from '../shared';
import { Pubkey } from '@solana-suite/shared';

export namespace UserSideInput {
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
    attributes?: Shared.Attributes;
    properties?: Shared.Properties;
    maxSupply?: bignum;
    creators?: Shared.Creators;
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
    creators?: Shared.Creators;
    attributes?: Shared.Attributes;
    options?: Shared.Options;
  };
}
