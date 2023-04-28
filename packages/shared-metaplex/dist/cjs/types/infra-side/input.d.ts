import { Option } from '../shared';
import { _Same } from '../_same';
import { PublicKey } from '@solana/web3.js';
export declare namespace InfraSideInput {
    interface File extends Blob {
        readonly lastModified: number;
        readonly name: string;
    }
    type StorageType = 'nftStorage' | 'arweave';
    type StorageNftStorageMetadata = {
        storageType?: 'nftStorage';
    };
    type StorageArweaveMetadata = {
        storageType?: 'arweave';
    };
    type Collection = Option<{
        key: PublicKey;
        verified: boolean;
    }>;
    type Creator = Option<{
        readonly address: PublicKey;
        readonly share: number;
        readonly verified: boolean;
    }>;
    type Properties = _Same.Properties;
    type Offchain = {
        name?: string;
        symbol?: string;
        description?: string;
        seller_fee_basis_points?: number;
        image?: string;
        external_url?: string;
        attributes?: _Same.Attribute[];
        properties?: _Same.Properties;
        collection?: {
            name?: string;
            family?: string;
            [key: string]: unknown;
        };
    };
    type MetaplexDataV2 = {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        creators: Option<Creator[]>;
        collection: Option<{
            verified: boolean;
            key: PublicKey;
        }>;
        uses: Option<_Same.Uses>;
    };
}
