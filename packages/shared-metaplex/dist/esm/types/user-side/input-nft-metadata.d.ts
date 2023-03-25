import { StorageType } from '../infra-side/storage-metadata';
import { COption, bignum, FileContent } from '../shared';
import { User, _Common } from '../shared';
export type InputNftMetadata = {
    name: string;
    symbol: string;
    royalty: number;
    storageType: StorageType;
    filePath: FileContent;
    uri?: string;
    description?: string;
    external_url?: string;
    attributes?: User.Attribute[];
    properties?: _Common.Properties;
    isMutable?: boolean;
    maxSupply?: bignum;
    creators?: User.Creators[];
    uses?: COption<_Common.Uses>;
    isCollection?: boolean;
    collection?: User.Collection;
    options?: {
        [key: string]: unknown;
    };
};
