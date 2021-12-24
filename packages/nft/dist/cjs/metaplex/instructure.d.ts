export declare namespace MetaplexInstructure {
    class Creator {
        address: string;
        verified: boolean;
        share: number;
        constructor(args: {
            address: string;
            verified: boolean;
            share: number;
        });
    }
    class Data {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        creators: Creator[] | null;
        constructor(args: {
            name: string;
            symbol: string;
            uri: string;
            sellerFeeBasisPoints: number;
            creators: Creator[] | null;
        });
    }
    class CreateMetadataArgs {
        instruction: number;
        data: Data;
        isMutable: boolean;
        constructor(args: {
            data: Data;
            isMutable: boolean;
        });
    }
    class UpdateMetadataArgs {
        instruction: number;
        data: Data | null;
        updateAuthority: string | null;
        primarySaleHappened: boolean | null;
        constructor(args: {
            data?: Data;
            updateAuthority?: string;
            primarySaleHappened: boolean | null;
        });
    }
    enum MetadataKey {
        Uninitialized = 0,
        MetadataV1 = 4,
        EditionV1 = 1,
        MasterEditionV1 = 2,
        MasterEditionV2 = 6,
        EditionMarker = 7
    }
    class Metadata {
        key: MetadataKey;
        updateAuthority: string;
        mint: string;
        data: Data;
        primarySaleHappened: boolean;
        isMutable: boolean;
        constructor(args: {
            updateAuthority: string;
            mint: string;
            data: Data;
            primarySaleHappened: boolean;
            isMutable: boolean;
            editionNonce: number | null;
        });
    }
    const SCHEMA: Map<any, any>;
}
