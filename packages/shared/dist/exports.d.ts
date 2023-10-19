import * as _solana_web3_js from '@solana/web3.js';
import { TransactionInstruction, PublicKey, Keypair, Connection, Commitment } from '@solana/web3.js';
import { R as Result } from './index-719a6264.js';
import BN from 'bn.js';

declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;
type Pubkey = (string & {
    [pubKeyNominality]: never;
}) | string;
type Secret = (string & {
    [secretNominality]: never;
}) | string;

/**
 * Get Associated token Account.
 * if not created, create new token accouint
 *
 * @param {Pubkey} mint
 * @param {Pubkey} owner
 * @param {Secret} feePayer
 * @param {boolean} allowOwnerOffCurve
 * @returns Promise<string | Instruction>
 */
declare namespace AssociatedAccount {
    /**
     * Retry function if create new token accouint
     *
     * @param {Pubkey} mint
     * @param {Pubkey} owner
     * @param {Secret} feePayer
     * @returns Promise<string>
     */
    const retryGetOrCreate: (mint: Pubkey, owner: Pubkey, feePayer: Secret) => Promise<string>;
    /**
     * [Main logic]Get Associated token Account.
     * if not created, create new token accouint
     *
     * @param {Pubkey} mint
     * @param {Pubkey} owner
     * @param {Pubkey} feePayer
     * @returns Promise<string>
     */
    const makeOrCreateInstruction: (mint: Pubkey, owner: Pubkey, feePayer?: Pubkey, allowOwnerOffCurve?: boolean) => Promise<{
        tokenAccount: string;
        inst: TransactionInstruction | undefined;
    }>;
}

declare class KeypairAccount {
    secret: Secret;
    pubkey: Pubkey;
    constructor(params: {
        pubkey?: Pubkey;
        secret: Secret;
    });
    toPublicKey(): PublicKey;
    toKeypair(): Keypair;
    static isPubkey: (value: string) => value is Pubkey;
    static isSecret: (value: string) => value is Secret;
    static create: () => KeypairAccount;
    static toKeyPair: (keypair: Keypair) => KeypairAccount;
}

declare namespace Pda {
    const getMetadata: (mint: Pubkey) => PublicKey;
    const getMasterEdition: (mint: Pubkey) => PublicKey;
}

declare namespace Node {
    const getConnection: () => Connection;
    const changeConnection: (param: {
        cluster?: string;
        commitment?: Commitment;
        customClusterUrl?: string[];
    }) => void;
    const confirmedSig: (signature: string, commitment?: Commitment) => Promise<Result.Ok<_solana_web3_js.RpcResponseAndContext<_solana_web3_js.SignatureResult>, Error> | Result.Err<_solana_web3_js.RpcResponseAndContext<_solana_web3_js.SignatureResult>, Error> | Result.Ok<never, any> | Result.Err<never, any>>;
}

type FileType = string | File;

type StorageType = 'nftStorage' | 'arweave' | string;

type Option<T> = T | null;
type bignum = number | BN;
declare namespace Common {
    type Properties = {
        creators?: {
            address?: string;
            share?: number;
            [key: string]: unknown;
        }[];
        files?: {
            type?: string;
            filePath?: FileType;
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
    type Properties = Common.Properties;
    type Offchain = {
        name?: string;
        symbol?: string;
        description?: string;
        seller_fee_basis_points?: number;
        image?: string;
        external_url?: string;
        attributes?: Common.Attribute[];
        properties?: Common.Properties;
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
        uses: Option<Common.Uses>;
    };
}

declare namespace UserSideInput {
    type Collection = Pubkey;
    type Creators = {
        address: Pubkey;
        share: number;
        verified: boolean;
    };
    type Properties = Common.Properties;
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
        filePath?: FileType;
        uri?: string;
        isMutable?: boolean;
        description?: string;
        external_url?: string;
        attributes?: Common.Attribute[];
        properties?: Properties;
        maxSupply?: bignum;
        creators?: Creators[];
        uses?: Common.Uses;
        collection?: Collection;
        options?: Common.Options;
    };
    type TokenMetadata = {
        name: string;
        symbol: string;
        filePath?: FileType;
        uri?: string;
        storageType?: StorageType;
        description?: string;
        royalty?: number;
        uses?: Common.Uses;
        creators?: Creators[];
        attributes?: Common.Attribute[];
        options?: Common.Options;
    };
}

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
    export const ROYALTY_MIN = 0;
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

declare enum FilterType {
    Memo = "memo",
    Mint = "mint",
    OnlyMemo = "only-memo",
    Transfer = "transfer"
}
declare enum ModuleName {
    SolNative = "system",
    SplToken = "spl-token"
}

declare const _default: {
    FilterType: typeof FilterType;
    ModuleName: typeof ModuleName;
    FilterOptions: {
        Transfer: {
            program: string[];
            action: string[];
        };
        Memo: {
            program: string[];
            action: string[];
        };
        Mint: {
            program: string[];
            action: string[];
        };
    };
    Validator: typeof Validator;
    ValidatorError: typeof ValidatorError;
    Node: typeof Node;
    AssociatedAccount: typeof AssociatedAccount;
    KeypairAccount: typeof KeypairAccount;
    Pda: typeof Pda;
};

export { _default as default };
