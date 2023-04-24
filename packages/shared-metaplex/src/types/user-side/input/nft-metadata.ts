import { InfraSide } from '../../infra-side/input/offchain';
import { _Common, bignum, FileContent, User } from '../../shared';

export module UserSide {
  export module Input {
    export type NftMetadata = {
      name: string;
      symbol: string;
      royalty: number;
      storageType?: InfraSide.Input.StorageType;
      filePath?: FileContent;
      uri?: string;
      isMutable?: boolean;
      description?: string;
      external_url?: string;
      attributes?: User.Attribute[];
      properties?: _Common.Properties;
      maxSupply?: bignum;
      creators?: User.Creators[];
      uses?: _Common.Uses;
      collection?: User.Input.Collection;
      options?: { [key: string]: unknown };
    };
  }
}
