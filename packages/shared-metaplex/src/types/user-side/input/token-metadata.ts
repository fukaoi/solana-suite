import { _Common, FileContent, Option, User } from '../../shared';
import { InfraSide } from '../../infra-side/input/offchain';

export namespace UserSide {
  export namespace Input {
    export type TokenMetadata = {
      name: string;
      symbol: string;
      filePath?: FileContent;
      uri?: string;
      storageType?: InfraSide.Input.StorageType;
      description?: string;
      royalty?: number;
      attributes?: User.Attribute[];
      creators?: User.Creators[];
      uses?: Option<_Common.Uses>;
      options?: { [key: string]: unknown };
    };
  }
}
