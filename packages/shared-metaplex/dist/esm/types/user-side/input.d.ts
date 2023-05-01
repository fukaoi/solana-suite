import { InfraSideInput } from '../infra-side/input';
import { bignum, FileContent } from '../shared';
import { _Same } from '../_same';
import { Pubkey } from '@solana-suite/shared';
export declare namespace UserSideInput {
    type Collection = Pubkey;
    type Creators = {
        address: Pubkey;
        share: number;
        verified: boolean;
    };
    type Properties = _Same.Properties;
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
        attributes?: _Same.Attribute[];
        properties?: Properties;
        maxSupply?: bignum;
        creators?: Creators[];
        uses?: _Same.Uses;
        collection?: Collection;
        options?: _Same.Options;
    };
    type TokenMetadata = {
        name: string;
        symbol: string;
        filePath?: FileContent;
        uri?: string;
        storageType?: InfraSideInput.StorageType;
        description?: string;
        royalty?: number;
        uses?: _Same.Uses;
        creators?: Creators[];
        attributes?: _Same.Attribute[];
        options?: _Same.Options;
    };
}
