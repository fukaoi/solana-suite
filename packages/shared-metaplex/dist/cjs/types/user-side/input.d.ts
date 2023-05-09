import { StorageType } from '../../types';
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
    enum TokenStandard {
        NonFungible = 0,
        FungibleAsset = 1,
        Fungible = 2,
        NonFungibleEdition = 3,
        ProgrammableNonFungible = 4
    }
    type NftMetadata = {
        name: string;
        symbol: string;
        royalty: number;
        storageType?: StorageType;
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
        storageType?: StorageType;
        description?: string;
        royalty?: number;
        uses?: _Shared.Uses;
        creators?: Creators[];
        attributes?: _Shared.Attribute[];
        options?: _Shared.Options;
    };
}
