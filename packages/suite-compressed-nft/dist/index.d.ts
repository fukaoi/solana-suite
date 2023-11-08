import * as _solana_web3_js from '@solana/web3.js';
import { TransactionSignature, TransactionInstruction, PublicKey, Keypair, Connection, Commitment } from '@solana/web3.js';
import BN from 'bn.js';

declare abstract class AbstractResult$1<T, E extends Error> {
    protected abstract _chain<X, U extends Error>(ok: (value: T) => Result$1<X, U>, err: (error: E) => Result$1<X, U>): Result$1<X, U>;
    unwrap(): T;
    unwrap<U>(ok: (value: T) => U): U;
    unwrap<U, V>(ok: (value: T) => U, err: (error: E) => V): U | V;
    map<U>(ok: (value: T) => U): Result$1<U, E>;
    map<U, F extends Error>(ok: (value: T) => U, err: (error: E) => F): Result$1<U, F>;
    chain<X>(ok: (value: T) => Result$1<X, E>): Result$1<X, E>;
    chain<X>(ok: (value: T) => Result$1<X, E>): Result$1<X, E>;
    chain<X, U extends Error>(ok: (value: T) => Result$1<X, U>, err: (error: E) => Result$1<X, U>): Result$1<X, U>;
    match<U, F>(ok: (value: T) => U, err: (error: E) => F): void | Promise<void>;
    submit(): Promise<Result$1<TransactionSignature, Error>>;
}
declare class InternalOk$1<T, E extends Error> extends AbstractResult$1<T, E> {
    readonly value: T;
    readonly isOk = true;
    readonly isErr = false;
    constructor(value: T);
    protected _chain<X, U extends Error>(ok: (value: T) => Result$1<X, U>, _err: (error: E) => Result$1<X, U>): Result$1<X, U>;
}
declare class InternalErr$1<T, E extends Error> extends AbstractResult$1<T, E> {
    readonly error: E;
    readonly isOk = false;
    readonly isErr = true;
    constructor(error: E);
    protected _chain<X, U extends Error>(_ok: (value: T) => Result$1<X, U>, err: (error: E) => Result$1<X, U>): Result$1<X, U>;
}
declare namespace Result$1 {
    export type Ok<T, E extends Error> = InternalOk$1<T, E>;
    export type Err<T, E extends Error> = InternalErr$1<T, E>;
    export function ok<T, E extends Error>(value: T): Result$1<T, E>;
    export function err<E extends Error, T = never>(error?: E): Result$1<T, E>;
    type U = Result$1<unknown>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U, R14 extends U, R15 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>,
        OkType$1<R11>,
        OkType$1<R12>,
        OkType$1<R13>,
        OkType$1<R14>,
        OkType$1<R15>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14 | R15>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U, R14 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>,
        OkType$1<R11>,
        OkType$1<R12>,
        OkType$1<R13>,
        OkType$1<R14>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>,
        OkType$1<R11>,
        OkType$1<R12>,
        OkType$1<R13>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>,
        OkType$1<R11>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>,
        OkType$1<R11>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U>(obj: [R0, R1, R2, R3, R4, R5]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U>(obj: [R0, R1, R2, R3, R4]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U>(obj: [R0, R1, R2, R3]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>
    ], ErrType$1<R0 | R1 | R2 | R3>>;
    export function all<R0 extends U, R1 extends U, R2 extends U>(obj: [R0, R1, R2]): Result$1<[OkType$1<R0>, OkType$1<R1>, OkType$1<R2>], ErrType$1<R0 | R1 | R2>>;
    export function all<R0 extends U, R1 extends U>(obj: [R0, R1]): Result$1<[OkType$1<R0>, OkType$1<R1>], ErrType$1<R0 | R1>>;
    export function all<R0 extends U>(obj: [R0]): Result$1<[OkType$1<R0>], ErrType$1<R0>>;
    export function all(obj: []): Result$1<[]>;
    export function all<T extends U[] | Record<string, U>>(obj: T): Result$1<{
        [K in keyof T]: T[K] extends Result$1<infer I> ? I : never;
    }, {
        [K in keyof T]: T[K] extends Result$1<unknown, infer E> ? E : never;
    }[keyof T]>;
    export {};
}
type Result$1<T, E extends Error = Error> = Result$1.Ok<T, E> | Result$1.Err<T, E>;
type OkType$1<R extends Result$1<unknown>> = R extends Result$1<infer O> ? O : never;
type ErrType$1<R extends Result$1<unknown>> = R extends Result$1<unknown, infer E> ? E : never;

type Pubkey$1 = string;
type Secret$1 = string;
type KeypairAccount = {
    pubkey: Pubkey$1;
    secret: Secret$1;
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
         * Retry function if create new token accouint
         *
         * @param {Pubkey} mint
         * @param {Pubkey} owner
         * @param {Secret} feePayer
         * @returns Promise<string>
         */
        const retryGetOrCreate: (mint: Pubkey$1, owner: Pubkey$1, feePayer: Secret$1) => Promise<string>;
        /**
         * [Main logic]Get Associated token Account.
         * if not created, create new token accouint
         *
         * @param {Pubkey} mint
         * @param {Pubkey} owner
         * @param {Pubkey} feePayer
         * @returns Promise<string>
         */
        const makeOrCreateInstruction: (mint: Pubkey$1, owner: Pubkey$1, feePayer?: Pubkey$1, allowOwnerOffCurve?: boolean) => Promise<{
            tokenAccount: string;
            inst: TransactionInstruction | undefined;
        }>;
    }
}

declare namespace Account$2 {
    class Keypair {
        secret: Secret$1;
        pubkey: Pubkey$1;
        constructor(params: {
            pubkey?: Pubkey$1;
            secret: Secret$1;
        });
        toPublicKey(): PublicKey;
        toKeypair(): Keypair;
        static isPubkey: (value: string) => value is string;
        static isSecret: (value: string) => value is string;
        static create: () => Keypair;
        static toKeyPair: (keypair: Keypair) => Keypair;
    }
}

declare namespace Account$1 {
    namespace Pda {
        const getMetadata: (mint: Pubkey$1) => PublicKey;
        const getMasterEdition: (mint: Pubkey$1) => PublicKey;
    }
}

declare const Account: {
    Pda: typeof Account$1.Pda;
    Keypair: typeof Account$2.Keypair;
    Associated: typeof Account$3.Associated;
};

declare namespace Node {
    const getConnection: () => Connection;
    const changeConnection: (param: {
        cluster?: string;
        commitment?: Commitment;
        customClusterUrl?: string[];
    }) => void;
    const confirmedSig: (signature: string, commitment?: Commitment) => Promise<Result$1.Ok<_solana_web3_js.RpcResponseAndContext<_solana_web3_js.SignatureResult>, Error> | Result$1.Err<_solana_web3_js.RpcResponseAndContext<_solana_web3_js.SignatureResult>, Error> | Result$1.Ok<never, any> | Result$1.Err<never, any>>;
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

type InternalCollection = {
    key: PublicKey;
    verified: boolean;
};
type InternalCreators = {
    address: PublicKey;
    verified: boolean;
    share: number;
};

type bignum = number | BN;
type Option<T> = T | null;
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
type Creators = {
    address: Pubkey$1;
    share: number;
    verified: boolean;
};

type InputCollection = Pubkey$1;
type Options = {
    [key: string]: unknown;
};
type MetaplexDataV2 = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Option<InternalCreators[]>;
    collection: Option<InternalCollection>;
    uses: Option<Uses>;
};
type InputNftMetadata = {
    name: string;
    symbol: string;
    royalty: number;
    storageType: StorageType;
    filePath?: FileType;
    uri?: string;
    isMutable?: boolean;
    description?: string;
    external_url?: string;
    attributes?: Attribute[];
    properties?: Properties;
    maxSupply?: bignum;
    creators?: Creators[];
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
    export const isRoyalty: (royalty: number) => Result$1<string, ValidatorError>;
    export const isSellerFeeBasisPoints: (royalty: number) => Result$1<string, ValidatorError>;
    export const isName: (name: string) => Result$1<string, ValidatorError>;
    export const isSymbol: (symbol: string) => Result$1<string, ValidatorError>;
    export const isImageUrl: (image: string) => Result$1<string, ValidatorError>;
    export const checkAll: <T extends PickNftStorage | PickNftStorageMetaplex | PickMetaplex>(metadata: T) => Result$1<string, ValidatorError>;
    type PickNftStorage = Pick<Offchain, 'name' | 'symbol' | 'image' | 'seller_fee_basis_points'>;
    type PickNftStorageMetaplex = Pick<InputNftMetadata, 'name' | 'symbol' | 'royalty' | 'filePath'>;
    type PickMetaplex = Pick<MetaplexDataV2, 'name' | 'symbol' | 'uri' | 'sellerFeeBasisPoints'>;
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
declare const FilterOptions: {
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
type PostTokenAccount = {
    account: string;
    owner: string;
};
type WithMemo = {
    sig: string[];
    memo: string;
};
type Transfer = {
    parsed: {
        info: {
            destination: Pubkey;
            source: Pubkey;
            lamports: number;
        };
        type: string;
    };
    program: string;
    programId?: PublicKey;
};
type MintTo = {
    parsed: {
        info: {
            account: Pubkey;
            mint: Pubkey;
            mintAuthority: Pubkey;
            tokenAmount: string;
        };
        type: string;
    };
    program: string;
    programId?: PublicKey;
};
type MintToChecked = MintTo;
type TransferChecked = {
    parsed: {
        info: {
            destination: Pubkey;
            mint: Pubkey;
            multisigAuthority: Pubkey;
            signers: Pubkey[];
            source: Pubkey;
            tokenAmount: string;
        };
        type: string;
    };
    program: string;
    programId?: PublicKey;
};
type Memo = {
    parsed: string;
    program: string;
    programId: PublicKey;
};

declare global {
    interface String {
        toPublicKey(): PublicKey;
        toKeypair(): Keypair;
        toExplorerUrl(explorer?: Explorer): string;
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
    SolanaFM = "solanafm"
}

declare class Transaction {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: unknown;
    constructor(instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown);
    submit: () => Promise<Result$1<TransactionSignature, Error>>;
}

declare class MintTransaction {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: unknown;
    constructor(instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown);
    submit: () => Promise<Result$1<TransactionSignature, Error>>;
}

declare abstract class AbstractResult<T, E extends Error> {
    protected abstract _chain<X, U extends Error>(ok: (value: T) => Result<X, U>, err: (error: E) => Result<X, U>): Result<X, U>;
    unwrap(): T;
    unwrap<U>(ok: (value: T) => U): U;
    unwrap<U, V>(ok: (value: T) => U, err: (error: E) => V): U | V;
    map<U>(ok: (value: T) => U): Result<U, E>;
    map<U, F extends Error>(ok: (value: T) => U, err: (error: E) => F): Result<U, F>;
    chain<X>(ok: (value: T) => Result<X, E>): Result<X, E>;
    chain<X>(ok: (value: T) => Result<X, E>): Result<X, E>;
    chain<X, U extends Error>(ok: (value: T) => Result<X, U>, err: (error: E) => Result<X, U>): Result<X, U>;
    match<U, F>(ok: (value: T) => U, err: (error: E) => F): void | Promise<void>;
    submit(): Promise<Result<TransactionSignature, Error>>;
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

declare global {
    interface Array<T> {
        submit(): Promise<Result<TransactionSignature, Error>>;
    }
}

declare const CompressedNft: {
    mintCollection: (owner: Pubkey, signer: Secret, input: InputNftMetadata, feePayer?: Secret | undefined, freezeAuthority?: Pubkey | undefined) => Promise<Result$1<MintTransaction, Error>>;
    initTree: (treeOwner: Secret, feePayer: Secret, maxDepth?: number, maxBufferSize?: number) => Promise<Result$1<Transaction, Error>>;
};

export { Account, CompressedNft, FilterOptions, FilterType, KeypairAccount, Memo, MintTo, MintToChecked, ModuleName, Node, OwnerInfo, PostTokenAccount, Pubkey$1 as Pubkey, Secret$1 as Secret, Transfer, TransferChecked, Validator, ValidatorError, WithMemo };
