import { Metaplex } from "../metaplex";
export interface Attributes {
}
export interface Collection {
}
export interface Properties {
}
export interface MetadataStorageFormat {
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
export declare namespace Storage {
    const initStorageData: () => MetadataStorageFormat;
}
