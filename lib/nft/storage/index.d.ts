export interface Attributes {
}
export interface Collection {
}
export interface Properties {
}
export interface Creators {
}
export interface MetadataFormat {
    name: string;
    uri: string;
    symbol: string;
    update_authority: string;
    creators?: Creators[];
    seller_fee_basis_points?: number;
    primary_sale_happened?: boolean;
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
    creators?: Creators[];
}
export declare namespace Storage {
    const initStorageData: () => MetadataStorageFormat;
}
