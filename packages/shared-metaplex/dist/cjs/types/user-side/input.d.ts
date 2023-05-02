import { InfraSideInput } from '../infra-side/input';
import { _Shared, bignum, FileContent } from '../shared';
import { Pubkey } from '@solana-suite/shared';
export declare namespace UserSideInput {
    type Collection = Pubkey;
    type Creators = {
        address: Pubkey;
        share: number;
        verified: boolean;
    };
    type Properties = _Shared.Properties;
    type NftMetadata = {
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
    type TokenMetadata = {
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
