import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { Pubkey, Secret, Result } from '@solana-suite/shared';

type Option<T> = T | null;
type bignum = number | BN;
type FileContent = string | Buffer | Uint8Array | ArrayBuffer;
declare namespace _Shared {
    type Properties = {
        creators?: {
            address?: string;
            share?: number;
            [key: string]: unknown;
        }[];
        files?: {
            type?: string;
            filePath?: FileContent;
            [key: string]: unknown;
        }[];
        [key: string]: unknown;
    };
    type Attribute = {
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    };
    enum UseMethod {
        Burn = 0,
        Multiple = 1,
        Single = 2
    }
    type Uses = {
        useMethod: UseMethod;
        remaining: bignum;
        total: bignum;
    };
    type Options = {
        [key: string]: unknown;
    };
}

declare namespace InfraSideInput {
    interface File extends Blob {
        readonly lastModified: number;
        readonly name: string;
    }
    type StorageNftStorageMetadata = {
        storageType?: 'nftStorage';
    };
    type StorageArweaveMetadata = {
        storageType?: 'arweave';
    };
    type Collection = {
        key: PublicKey;
        verified: boolean;
    };
    type Creators = {
        address: PublicKey;
        verified: boolean;
        share: number;
    };
    type Properties = _Shared.Properties;
    type Offchain = {
        name?: string;
        symbol?: string;
        description?: string;
        seller_fee_basis_points?: number;
        image?: string;
        external_url?: string;
        attributes?: _Shared.Attribute[];
        properties?: _Shared.Properties;
        collection?: {
            name?: string;
            family?: string;
            [key: string]: unknown;
        };
        created_at?: number;
    };
    type MetaplexDataV2 = {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        creators: Option<Creators[]>;
        collection: Option<Collection>;
        uses: Option<_Shared.Uses>;
    };
}

declare namespace InfraSideOutput {
    type Collection = {
        verified: boolean;
        key: PublicKey;
    };
    type OnchainAndOffchain = {
        onchain: Metadata;
        offchain: InfraSideOutput.Offchain;
    };
    type Creator = InfraSideInput.Creators;
    type Offchain = InfraSideInput.Offchain;
    type Uses = _Shared.Uses;
}

declare namespace UserSideInput {
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

declare namespace UserSideOutput {
    type Creators = UserSideInput.Creators;
    type Collection = {
        address: Pubkey;
        verified: boolean;
    };
    type Uses = _Shared.Uses;
    type NftMetadata = {
        mint: string;
        updateAuthority: string;
        royalty: number;
        name: string;
        symbol: string;
        uri: string;
        isMutable: boolean;
        primarySaleHappened: boolean;
        editionNonce: Option<number>;
        offchain: InfraSideOutput.Offchain;
        tokenAmount: string;
        collection?: Collection | undefined;
        creators?: Creators[] | undefined;
        uses?: _Shared.Uses | undefined;
        dateTime?: Date | undefined;
    };
    type TokenMetadata = {
        mint: string;
        name: string;
        symbol: string;
        uri: string;
        royalty: number;
        offchain: InfraSideOutput.Offchain;
        tokenAmount: string;
        attributes?: _Shared.Attribute | undefined;
        creators?: Creators[] | undefined;
        uses?: _Shared.Uses | undefined;
        dateTime?: Date | undefined;
    };
}

type StorageType = 'nftStorage' | 'arweave' | string;

type Condition = 'overMax' | 'underMin';
interface Limit {
    threshold: number;
    condition: Condition;
}
interface Details {
    key: string;
    message: string;
    actual: string | number;
    limit?: Limit;
}

declare namespace Convert$6 {
    namespace Collection {
        const intoInfraSide: (input: Option<UserSideInput.Collection> | undefined) => Option<InfraSideInput.Collection>;
        const intoUserSide: (output: Option<InfraSideOutput.Collection>) => UserSideOutput.Collection | undefined;
    }
}

declare namespace Convert$5 {
    namespace Creators {
        const intoInfraSide: (input: Option<UserSideInput.Creators[]> | undefined) => Option<InfraSideInput.Creators[]>;
        const intoUserSide: (output: Option<InfraSideOutput.Creator[]>) => UserSideOutput.Creators[] | undefined;
    }
}

declare namespace Convert$4 {
    namespace NftMetadata {
        const intoInfraSide: (input: UserSideInput.NftMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
        const intoUserSide: (output: InfraSideOutput.OnchainAndOffchain, tokenAmount: string) => UserSideOutput.NftMetadata;
    }
}

declare namespace Convert$3 {
    namespace Properties {
        const intoInfraSide: (input: UserSideInput.Properties | undefined, storageFunc: (data: FileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>, storageType: StorageType, feePayer?: Secret) => Promise<InfraSideInput.Properties>;
    }
}

declare namespace Convert$2 {
    namespace TokenMetadata {
        const intoInfraSide: (input: UserSideInput.TokenMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
        const intoUserSide: (output: InfraSideOutput.OnchainAndOffchain, tokenAmount: string) => UserSideOutput.TokenMetadata;
        const deleteNullStrings: (str: string) => string;
    }
}

declare namespace Convert$1 {
    namespace Uses {
        const intoUserSide: (output: Option<InfraSideOutput.Uses>) => UserSideOutput.Uses | undefined;
    }
}

declare const Convert: {
    Uses: typeof Convert$1.Uses;
    TokenMetadata: typeof Convert$2.TokenMetadata;
    Properties: typeof Convert$3.Properties;
    NftMetadata: typeof Convert$4.NftMetadata;
    Creators: typeof Convert$5.Creators;
    Collection: typeof Convert$6.Collection;
};

declare namespace Pda {
    const getMetadata: (mint: Pubkey) => PublicKey;
    const getMasterEdition: (mint: Pubkey) => PublicKey;
}

declare namespace Validator {
    export namespace Message {
        const SUCCESS = "success";
        const SMALL_NUMBER = "too small";
        const BIG_NUMBER = "too big";
        const LONG_LENGTH = "too long";
        const EMPTY = "invalid empty value";
        const INVALID_URL = "invalid url";
        const ONLY_NODE_JS = "`string` type is only Node.js";
    }
    export const NAME_LENGTH = 32;
    export const SYMBOL_LENGTH = 10;
    export const URL_LENGTH = 200;
    export const ROYALTY_MAX = 100;
    export const SELLER_FEE_BASIS_POINTS_MAX = 10000;
    export const ROYALTY_MIN = -1;
    export const isRoyalty: (royalty: number) => Result<string, ValidatorError>;
    export const isSellerFeeBasisPoints: (royalty: number) => Result<string, ValidatorError>;
    export const isName: (name: string) => Result<string, ValidatorError>;
    export const isSymbol: (symbol: string) => Result<string, ValidatorError>;
    export const isImageUrl: (image: string) => Result<string, ValidatorError>;
    export const checkAll: <T extends PickNftStorage | PickNftStorageMetaplex | PickMetaplex>(metadata: T) => Result<string, ValidatorError>;
    type PickNftStorage = Pick<InfraSideInput.Offchain, 'name' | 'symbol' | 'image' | 'seller_fee_basis_points'>;
    type PickNftStorageMetaplex = Pick<UserSideInput.NftMetadata, 'name' | 'symbol' | 'royalty' | 'filePath'>;
    type PickMetaplex = Pick<InfraSideInput.MetaplexDataV2, 'name' | 'symbol' | 'uri' | 'sellerFeeBasisPoints'>;
    export {};
}
declare class ValidatorError extends Error {
    details: Details[];
    constructor(message: string, details: Details[]);
}

declare namespace Royalty {
    const THRESHOLD = 100;
    const convert: (percentage: number) => number;
}

export { Condition, Convert, Details, FileContent, InfraSideInput, InfraSideOutput, Limit, Option, Pda, Royalty, StorageType, UserSideInput, UserSideOutput, Validator, ValidatorError, _Shared, bignum };
