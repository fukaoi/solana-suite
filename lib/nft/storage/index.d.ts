import { Metaplex } from '../metaplex';
export * from './arweave';
export * from './nft-storage';
export declare namespace Storage {
    interface Attributes {
    }
    interface Collection {
    }
    interface Properties {
    }
    interface Format {
        name: string;
        description: string;
        image: string;
        symbol?: string;
        seller_fee_basis_points?: number;
        animation_url?: string;
        external_url?: string;
        category?: string;
        attributes?: Attributes[];
        collection?: Collection;
        properties?: Properties[];
        creators?: Metaplex.Creators[];
    }
    const initStorageData: () => Format;
}
