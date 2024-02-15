import * as _solana_web3_js from '@solana/web3.js';
import { TransactionInstruction, PublicKey, Keypair, Commitment, TransactionSignature, Connection } from '@solana/web3.js';
import BN from 'bn.js';
import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';

declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;
type Pubkey = (string & {
    [pubKeyNominality]: never;
}) | string;
type Secret = (string & {
    [secretNominality]: never;
}) | string;
type KeypairAccount = {
    pubkey: Pubkey;
    secret: Secret;
};
type OwnerInfo = {
    sol: number;
    lamports: number;
    owner: string;
};

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
declare namespace Account$3 {
    namespace Associated {
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
}

declare namespace Account$2 {
    class Keypair {
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
        static create: () => Keypair;
        static toKeyPair: (keypair: Keypair) => Keypair;
    }
}

declare namespace Account$1 {
    namespace Pda {
        const getMetadata: (address: Pubkey) => PublicKey;
        const getMasterEdition: (address: Pubkey) => PublicKey;
        const getTreeAuthority: (address: Pubkey) => PublicKey;
        const getBgumSigner: () => PublicKey;
        const getAssetId: (address: Pubkey, leafIndex: number) => Pubkey;
    }
}

declare global {
    interface String {
        toPublicKey(): PublicKey;
        toKeypair(): Keypair;
        toExplorerUrl(explorer?: Explorer, options?: ExplorerOptions): string;
    }
    interface Number {
        toSol(): number;
        toLamports(): number;
    }
    interface Console {
        debug(data: unknown, data2?: unknown, data3?: unknown): void;
    }
    interface Secret {
        toKeypair(): Keypair;
    }
    interface Pubkey {
        toPublicKey(): PublicKey;
    }
}
declare enum Explorer {
    Solscan = "solscan",
    SolanaFM = "solanafm",
    Xray = "xray"
}
type ExplorerOptions = {
    replacePath: string;
};

declare const Account: {
    Pda: typeof Account$1.Pda;
    Keypair: typeof Account$2.Keypair;
    Associated: typeof Account$3.Associated;
};

declare namespace Constants {
    namespace WarnningMessage {
        const NFT_STORAGE_API_KEY = "\n        [YOU HAVE TO DO]\n        --------------------------------------\n        You need to update nftStorageApiKey define parameter in solana-suite.json.\n        Can get api key from https://nft.storage/\n        --------------------------------------\n        ";
        const DAS_API_URL = "\n        [YOU HAVE TO DO]\n        --------------------------------------\n        You need to update dasApiUrl define parameter in solana-suite.json.\n        can get api url from https://www.helius.dev/\n        -------------------------------------- \n        ";
        const calculateProbability: () => boolean;
    }
}
declare namespace Constants {
    const currentCluster: string;
    const customClusterUrl: never[];
    const isDebugging: string;
    const nftStorageApiKey: string;
    const dasApiUrl: never[];
    enum Cluster {
        prd = "mainnet-beta",
        prdMetaplex = "mainnet-beta-metaplex",
        dev = "devnet",
        localhost = "localhost-devnet"
    }
    enum EndPointUrl {
        prd = "https://api.mainnet-beta.solana.com",
        prdMetaplex = "https://api.metaplex.solana.com",
        dev = "https://api.devnet.solana.com",
        localhost = "http://api.devnet.solana.com"
    }
    enum BundlrUrl {
        prd = "https://node1.irys.xyz,https://node2.irys.xyz",
        dev = "https://devnet.irys.xyz"
    }
    enum DasApiUrl {
        dev = "https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92,https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639"
    }
    enum NftstorageApiKey {
        dev = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE"
    }
    const loadConfig: () => Promise<void>;
    const switchCluster: (param: {
        cluster?: string;
        customClusterUrl?: string[];
    }) => string;
    const switchBundlr: (env: string) => string;
    const switchDasApi: (env: string) => string;
    const switchNftStorage: (env: string) => string;
    const WRAPPED_TOKEN_PROGRAM_ID: PublicKey;
    const MEMO_PROGRAM_ID: PublicKey;
    const METAPLEX_PROGRAM_ID: PublicKey;
    const COMMITMENT: Commitment;
    const NFT_STORAGE_GATEWAY_URL = "https://ipfs.io/ipfs";
    const IRYS_GATEWAY_URL = "https://gateway.irys.xyz";
    const BUNDLR_NETWORK_URL: string;
    const DAS_API_URL: string;
    const NFT_STORAGE_API_KEY: string;
    const EXPLORER_SOLSCAN_URL = "https://solscan.io";
    const EXPLORER_SOLANAFM_URL = "https://solana.fm";
    const EXPLORER_XRAY_URL = "https://xray.helius.xyz";
}

/**
 * convert buffer to Array
 *
 * @param {Buffer} buffer
 * @returns number[]
 */
declare const bufferToArray: (buffer: Buffer) => number[];
/**
 * Overwrite JS Object
 *
 * @param {unknown} object
 * @param {OverwriteObject[]} targets
 * @returns Object
 */
declare const overwriteObject: (object: unknown, targets: {
    existsKey: string;
    will: {
        key: string;
        value: unknown;
    };
}[]) => unknown;
/**
 * Display log for solana-suite-config.js
 *
 * @param {unknown} data1
 * @param {unknown} data2
 * @param {unknown} data3
 * @param {unknown} data4
 * @returns void
 */
declare const debugLog: (data1: unknown, data2?: unknown, data3?: unknown, data4?: unknown) => void;
/**
 * sleep timer
 *
 * @param {number} sec
 * @returns Promise<number>
 */
declare const sleep: (sec: number) => Promise<number>;
/**
 * Node.js or Browser js
 *
 * @returns boolean
 */
declare const isBrowser: () => boolean;
/**
 * Node.js or Browser js
 *
 * @returns boolean
 */
declare const isNode: () => boolean;
/**
 * argument is promise or other
 *
 * @param {unknown} obj
 * @returns boolean
 */
declare const isPromise: (obj: unknown) => obj is Promise<unknown>;
/**
 * Try async monad
 *
 * @returns Promise<Result<T, E>>
 */
declare function Try<T, E extends Error>(asyncblock: () => Promise<T>, finallyInput?: () => void): Promise<Result<T, E>>;
declare function Try<T, E extends Error>(block: () => T): Result<T, E>;
/**
 * argument is promise or other
 *
 * @param {number|undefined} created_at
 * @returns Date | undefined
 */
declare const convertTimestampToDateTime: (created_at: number | undefined) => Date | undefined;
/**
 * Get unix timestamp
 *
 * @returns number
 */
declare const unixTimestamp: () => number;

type SubmitOptions = {
    feePayer: Secret;
    isPriorityFee: boolean;
};

declare abstract class AbstractResult<T, E extends Error> {
    protected abstract _chain<X, U extends Error>(ok: (value: T) => Result<X, U>, err: (error: E) => Result<X, U>): Result<X, U>;
    unwrap(): T;
    unwrap<U>(ok: (value: T) => U): U;
    unwrap<U, V>(ok: (value: T) => U, err: (error: E) => V): U | V;
    unwrap<U>(ok: (value: T) => U, err: (error: E) => U): U;
    map<U>(ok: (value: T) => U): Result<U, E>;
    map<U, F extends Error>(ok: (value: T) => U, err: (error: E) => F): Result<U, F>;
    chain<X>(ok: (value: T) => Result<X, E>): Result<X, E>;
    chain<X>(ok: (value: T) => Result<X, E>): Result<X, E>;
    chain<X, U extends Error>(ok: (value: T) => Result<X, U>, err: (error: E) => Result<X, U>): Result<X, U>;
    match<U, F>(ok: (value: T) => U, err: (error: E) => F): void | Promise<void>;
    submit(options?: Partial<SubmitOptions>): Promise<Result<TransactionSignature, Error>>;
}
declare global {
    interface Array<T> {
        submit(options: Partial<SubmitOptions>): Promise<Result<TransactionSignature, Error>>;
    }
}
declare class InternalOk<T, E extends Error> extends AbstractResult<T, E> {
    readonly value: T;
    readonly isOk = true;
    readonly isErr = false;
    constructor(value: T);
    protected _chain<X, U extends Error>(ok: (value: T) => Result<X, U>, _err: (error: E) => Result<X, U>): Result<X, U>;
}
declare class InternalErr<T, E extends Error> extends AbstractResult<T, E> {
    readonly error: E;
    readonly isOk = false;
    readonly isErr = true;
    constructor(error: E);
    protected _chain<X, U extends Error>(_ok: (value: T) => Result<X, U>, err: (error: E) => Result<X, U>): Result<X, U>;
}
declare namespace Result {
    export type Ok<T, E extends Error> = InternalOk<T, E>;
    export type Err<T, E extends Error> = InternalErr<T, E>;
    export function ok<T, E extends Error>(value: T): Result<T, E>;
    export function err<E extends Error, T = never>(error?: E): Result<T, E>;
    type U = Result<unknown>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U, R14 extends U, R15 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>,
        OkType<R11>,
        OkType<R12>,
        OkType<R13>,
        OkType<R14>,
        OkType<R15>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14 | R15>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U, R14 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>,
        OkType<R11>,
        OkType<R12>,
        OkType<R13>,
        OkType<R14>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>,
        OkType<R11>,
        OkType<R12>,
        OkType<R13>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>,
        OkType<R11>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>,
        OkType<R11>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U>(obj: [R0, R1, R2, R3, R4, R5]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U>(obj: [R0, R1, R2, R3, R4]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>
    ], ErrType<R0 | R1 | R2 | R3 | R4>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U>(obj: [R0, R1, R2, R3]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>
    ], ErrType<R0 | R1 | R2 | R3>>;
    export function all<R0 extends U, R1 extends U, R2 extends U>(obj: [R0, R1, R2]): Result<[OkType<R0>, OkType<R1>, OkType<R2>], ErrType<R0 | R1 | R2>>;
    export function all<R0 extends U, R1 extends U>(obj: [R0, R1]): Result<[OkType<R0>, OkType<R1>], ErrType<R0 | R1>>;
    export function all<R0 extends U>(obj: [R0]): Result<[OkType<R0>], ErrType<R0>>;
    export function all(obj: []): Result<[]>;
    export function all<T extends U[] | Record<string, U>>(obj: T): Result<{
        [K in keyof T]: T[K] extends Result<infer I> ? I : never;
    }, {
        [K in keyof T]: T[K] extends Result<unknown, infer E> ? E : never;
    }[keyof T]>;
    export {};
}
type Result<T, E extends Error = Error> = Result.Ok<T, E> | Result.Err<T, E>;
type OkType<R extends Result<unknown>> = R extends Result<infer O> ? O : never;
type ErrType<R extends Result<unknown>> = R extends Result<unknown, infer E> ? E : never;

declare namespace Node {
    const getConnection: () => Connection;
    const changeConnection: (param: {
        cluster?: string;
        commitment?: Commitment;
        customClusterUrl?: string[];
    }) => void;
    const confirmedSig: (signature: string, commitment?: Commitment) => Promise<Result.Ok<_solana_web3_js.RpcResponseAndContext<_solana_web3_js.SignatureResult>, Error> | Result.Err<_solana_web3_js.RpcResponseAndContext<_solana_web3_js.SignatureResult>, Error> | Result.Ok<never, any> | Result.Err<never, any>>;
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

type bignum = number | BN;
declare enum UseMethod {
    Burn = 0,
    Multiple = 1,
    Single = 2
}
type Uses = {
    useMethod: UseMethod;
    remaining: bignum;
    total: bignum;
};
type InputCreators = {
    address: Pubkey;
    secret: Secret;
    share: number;
};

type FileType = string | File;

type StorageType = 'nftStorage' | 'arweave' | string;
type Offchain = {
    name?: string;
    symbol?: string;
    description?: string;
    seller_fee_basis_points?: number;
    image?: string;
    external_url?: string;
    attributes?: Attribute[];
    properties?: Properties;
    collection?: {
        name?: string;
        family?: string;
        [key: string]: unknown;
    };
    collectionDetails?: {
        kind: string;
        size: number;
    };
    created_at?: number;
};
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

type InputCollection = Pubkey;
type Options = {
    [key: string]: unknown;
};
type InputNftMetadata = {
    name: string;
    symbol: string;
    royalty?: number;
    storageType?: StorageType;
    filePath?: FileType;
    uri?: string;
    isMutable?: boolean;
    description?: string;
    external_url?: string;
    attributes?: Attribute[];
    properties?: Properties;
    maxSupply?: bignum;
    creators?: InputCreators[];
    uses?: Uses;
    collection?: InputCollection;
    options?: Options;
};

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
    type PickNftStorage = Pick<Offchain, 'name' | 'symbol' | 'image' | 'seller_fee_basis_points'>;
    type PickNftStorageMetaplex = Pick<InputNftMetadata, 'name' | 'symbol' | 'royalty' | 'filePath'>;
    type PickMetaplex = Pick<DataV2, 'name' | 'symbol' | 'uri' | 'sellerFeeBasisPoints'>;
    export {};
}
declare class ValidatorError extends Error {
    details: Details[];
    constructor(message: string, details: Details[]);
}

export { Account, Constants, Explorer, ExplorerOptions, KeypairAccount, Node, OwnerInfo, Pubkey, Result, Secret, Try, Validator, ValidatorError, bufferToArray, convertTimestampToDateTime, debugLog, isBrowser, isNode, isPromise, overwriteObject, sleep, unixTimestamp };
