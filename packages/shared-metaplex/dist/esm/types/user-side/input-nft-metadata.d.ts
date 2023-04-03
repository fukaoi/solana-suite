import { StorageType } from '../infra-side/storage-metadata';
import { bignum, FileContent } from '../shared';
import { User, _Common } from '../shared';
export type InputNftMetadata = {
    name: string;
    symbol: string;
    royalty: number;
    storageType?: StorageType;
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
    options?: {
        [key: string]: unknown;
    };
};
