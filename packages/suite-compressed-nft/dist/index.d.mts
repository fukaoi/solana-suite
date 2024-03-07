import * as mpl_bubblegum_instruction from 'mpl-bubblegum-instruction';
import BN from 'bn.js';
import * as _solana_web3_js from '@solana/web3.js';
import { TransactionInstruction, Keypair, TransactionSignature } from '@solana/web3.js';

declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;
type Pubkey = (string & {
    [pubKeyNominality]: never;
}) | string;
type Secret$1 = (string & {
    [secretNominality]: never;
}) | string;

type FileType = string | File;

type StorageType = 'nftStorage' | 'arweave' | string;
type Offchain = {
    name?: string;
    symbol?: string;
    description?: string;
    seller_fee_basis_points?: number;
    image?: string;
    animation_url?: string;
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

type Authority = {
    address: Pubkey;
    scopes: string[];
};
type Creators = {
    address: Pubkey;
    share: number;
    verified: boolean;
}[];
type Metadata = {
    mint: Pubkey;
    collectionMint: Pubkey;
    authorities: Authority[];
    royalty: number;
    name: string;
    symbol: string;
    uri: string;
    creators: Creators;
    treeAddress: Pubkey;
    isCompressed: boolean;
    isMutable: boolean;
    isBurn: boolean;
    editionNonce: number;
    primarySaleHappened: boolean;
    dateTime: Date;
    offchain: Offchain;
};
type NftMetadata = {
    page: number;
    total: number;
    limit: number;
    metadatas: Metadata[];
};

declare enum SortDirection {
    Asc = "asc",
    Desc = "desc"
}
declare enum SortBy {
    Created = "created",
    Updated = "updated",
    Recent = "recent_action"
}
type Sortable = {
    sortBy: SortBy;
    sortDirection: SortDirection;
};
type FindOptions = {
    limit: number;
    page: number;
    sort: Sortable;
    before: string;
    after: string;
};

type DelegateOptions = {
    delegate: Pubkey;
};

type GassLessDelegateOptions = {
    isPriorityFee: boolean;
};

type GassLessTransferOptions = {
    isPriorityFee: boolean;
};

type MintOptions = {
    receiver: Pubkey;
    delegate: Pubkey;
    feePayer: Secret$1;
};

type MintCollectionOptions = {
    freezeAuthority: Pubkey;
    feePayer: Secret$1;
};

type SpaceOptions = {
    feePayer: Secret$1;
};
type SpaceNumber = 8 | 16000 | 100000 | 16700000 | 67000000 | 1000000000;

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
    secret: Secret$1;
    share: number;
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

type SubmitOptions = {
    feePayer: Secret$1;
    isPriorityFee: boolean;
    addSolPriorityFee: number;
};
type CommonStructure<T = undefined> = {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: T;
    submit: (options: Partial<SubmitOptions>) => Promise<Result<TransactionSignature, Error>>;
};
type MintStructure<T = Pubkey> = {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    data: T;
    feePayer: Keypair;
    submit: (options: Partial<SubmitOptions>) => Promise<Result<TransactionSignature, Error>>;
};
type PartialSignStructure<T = Pubkey> = {
    hexInstruction: string;
    data?: T;
    submit: (options: Partial<SubmitOptions>) => Promise<Result<string, Error>>;
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
        submit(options?: Partial<SubmitOptions>): Promise<Result<TransactionSignature, Error>>;
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

declare namespace CompressedNft$1 {
    class Space {
        spaceOwner: Pubkey;
        constructor(spaceOwner: Pubkey);
        getAssetId: () => Promise<Pubkey>;
    }
    /**
     * create a new nft space
     * This function needs only 1 call
     *
     * @param {Secret} owner
     * @param {SpaceNumber} spaceSize
     * @param {Partial<SpaceOptions>} options
     *
     * @return Promise<Result<MintTransaction, Error>>
     */
    const createSpace: (owner: Secret, spaceSize: SpaceNumber, options?: Partial<SpaceOptions>) => Promise<Result<MintStructure, Error>>;
    /**
     * Calculate space cost
     *
     * @param {number} spaceSize
     * @return Promise<{sol: number}>
     */
    const calculateSpaceCost: (spaceSize: number) => Promise<{
        sol: number;
    }>;
}

/** @namespace */
declare const CompressedNft: {
    createTransfer: (assetId: Pubkey, assetIdOwner: Pubkey, dest: Pubkey, delegate?: Pubkey | undefined) => Promise<_solana_web3_js.TransactionInstruction>;
    transfer: (mint: Pubkey, owner: Pubkey, dest: Pubkey, ownerOrMultisig: Secret[]) => Promise<Result<CommonStructure, Error>>;
    mintCollection: (owner: Secret$1, input: InputNftMetadata, options?: Partial<MintCollectionOptions>) => Promise<Result<MintStructure, Error>>;
    Space: typeof CompressedNft$1.Space;
    initSpace: (owner: Secret, maxDepth: number, maxBufferSize: number, canopyDepth: number, options?: Partial<SpaceOptions>) => Promise<Result<MintStructure, Error>>;
    createSpace: (owner: Secret, spaceSize: SpaceNumber, options?: Partial<SpaceOptions>) => Promise<Result<MintStructure, Error>>;
    calculateSpaceCost: (spaceSize: number) => Promise<{
        sol: number;
    }>;
    createVerifyCreator: (creators: mpl_bubblegum_instruction.Creator[], assetId: _solana_web3_js.PublicKey, treeOwner: _solana_web3_js.PublicKey, metadata: mpl_bubblegum_instruction.MetadataArgs, feePayer: _solana_web3_js.PublicKey) => Promise<_solana_web3_js.TransactionInstruction>;
    mint: (owner: Secret$1, input: InputNftMetadata, treeOwner: Pubkey, collectionMint: Pubkey, options?: Partial<MintOptions>) => Promise<Result<MintStructure<CompressedNft$1.Space>, Error>>;
    gasLessTransfer: (mint: Pubkey, owner: Secret$1, dest: Pubkey, feePayer: Pubkey, options?: Partial<GassLessTransferOptions>) => Promise<Result<PartialSignStructure, Error>>;
    gasLessDelegate: (mint: Pubkey, owner: Secret$1, newDelegate: Pubkey, options?: Partial<GassLessDelegateOptions>) => Promise<Result<PartialSignStructure, Error>>;
    findByOwner: (owner: Pubkey, options?: Partial<FindOptions>) => Promise<Result<NftMetadata, Error>>;
    findByMint: (mint: Pubkey) => Promise<Result<Partial<Metadata>, Error>>;
    findByCollection: (collectionMint: Pubkey, options?: Partial<FindOptions>) => Promise<Result<NftMetadata, Error>>;
    createDeleagate: (assetId: _solana_web3_js.PublicKey, newDelegate: _solana_web3_js.PublicKey | null) => Promise<_solana_web3_js.TransactionInstruction>;
    setDelegate: (mint: Pubkey, owner: Secret$1, options?: Partial<DelegateOptions>) => Promise<Result<CommonStructure, Error>>;
};

export { CompressedNft };
