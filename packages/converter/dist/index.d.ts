import { PublicKey, ParsedTransactionWithMeta, TransactionSignature, Keypair } from '@solana/web3.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import BN from 'bn.js';

type InternalCollection = {
    key: PublicKey;
    verified: boolean;
};
type InternalCreators = {
    address: PublicKey;
    verified: boolean;
    share: number;
};

type Pubkey$1 = string;
type Secret = string;

type FileType = string | File;

type StorageType = 'nftStorage' | 'arweave' | string;
type OnchainAndOffchain = {
    onchain: Metadata;
    offchain: Offchain;
};
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
type InputCreators = {
    address: Pubkey$1;
    secret: Secret;
    share: number;
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
    creators?: InputCreators[];
    uses?: Uses;
    collection?: InputCollection;
    options?: Options;
};

declare namespace Converter$b {
    namespace Collection {
        const intoInfra: (input: Option<InputCollection> | undefined) => Option<InternalCollection>;
        const intoUser: (output: Option<InternalCollection>) => Collection | undefined;
    }
}

declare namespace Converter$a {
    namespace Creators {
        const intoInfra: (input: Option<InputCreators[]> | undefined) => InternalCreators[];
        const intoUser: (output: Option<InternalCreators[]>) => Creators[] | undefined;
    }
}

type PostTokenAccount = {
    account: string;
    owner: string;
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

type History = {
    sol?: string;
    account?: string;
    destination?: Pubkey;
    source?: Pubkey;
    authority?: Pubkey;
    multisigAuthority?: Pubkey;
    signers?: Pubkey[];
    mint?: Pubkey;
    mintAuthority?: Pubkey;
    tokenAmount?: string;
    memo?: string;
    dateTime?: Date;
    type?: string;
    sig?: string;
    innerInstruction?: boolean;
};

declare namespace Converter$9 {
    namespace Memo {
        const intoUserSide: (output: Memo, meta: ParsedTransactionWithMeta, outputTransfer?: TransferChecked, mappingTokenAccount?: PostTokenAccount[]) => History | undefined;
    }
}

declare namespace Converter$8 {
    namespace Mint {
        const intoUserSide: (output: MintTo, meta: ParsedTransactionWithMeta) => History | undefined;
    }
}

declare namespace Converter$7 {
    namespace NftMetadata {
        const intoInfra: (input: InputNftMetadata, uri: string, sellerFeeBasisPoints: number) => MetaplexDataV2;
        const intoUser: (output: OnchainAndOffchain, tokenAmount: string) => NftMetadata;
    }
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

declare namespace Converter$6 {
    namespace Properties {
        const intoInfra: (input: Properties | undefined, callbackFunc: (filePath: FileType, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>, storageType: StorageType, feePayer?: Secret) => Promise<Properties>;
    }
}

declare namespace Converter$5 {
    namespace Royalty {
        const THRESHOLD = 100;
        const intoInfra: (percentage: number) => number;
    }
}

type InputTokenMetadata = {
    name: string;
    symbol: string;
    filePath?: FileType;
    uri?: string;
    storageType: StorageType;
    description?: string;
    royalty?: number;
    uses?: Uses;
    creators?: InputCreators[];
    attributes?: Attribute[];
    options?: Options;
};

declare namespace Converter$4 {
    namespace TokenMetadata {
        const intoInfra: (input: InputTokenMetadata, uri: string, sellerFeeBasisPoints: number) => MetaplexDataV2;
        const intoUser: (output: OnchainAndOffchain, tokenAmount: string) => TokenMetadata;
        const deleteNullStrings: (str: string) => string;
    }
}

declare namespace Converter$3 {
    namespace TransferChecked {
        const intoUserSide: (output: TransferChecked, meta: ParsedTransactionWithMeta, mappingTokenAccount?: PostTokenAccount[]) => History | undefined;
    }
}

declare namespace Converter$2 {
    namespace Transfer {
        const intoUserSide: (output: Transfer, meta: ParsedTransactionWithMeta) => History | undefined;
    }
}

declare namespace Converter$1 {
    namespace Uses {
        const intoUserSide: (output: Option<Uses>) => Uses | undefined;
    }
}

declare const Converter: {
    Uses: typeof Converter$1.Uses;
    Transfer: typeof Converter$2.Transfer;
    TransferChecked: typeof Converter$3.TransferChecked;
    TokenMetadata: typeof Converter$4.TokenMetadata;
    Royalty: typeof Converter$5.Royalty;
    Properties: typeof Converter$6.Properties;
    NftMetadata: typeof Converter$7.NftMetadata;
    Mint: typeof Converter$8.Mint;
    Memo: typeof Converter$9.Memo;
    Creators: typeof Converter$a.Creators;
    Collection: typeof Converter$b.Collection;
};

export { Converter };
