import BN from 'bn.js';
import { PublicKey, ParsedTransactionWithMeta, TransactionSignature, Keypair } from '@solana/web3.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

type Option<T> = T | null;
type bignum = number | BN;
type FileContent = string | Buffer | Uint8Array | ArrayBuffer;
declare namespace Common {
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
    type Uses = Common.Uses;
}

type StorageType = 'nftStorage' | 'arweave' | string;

type Pubkey = string;
type Secret = string;

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
        filePath?: FileContent;
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
        filePath?: FileContent;
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

declare namespace UserSideOutput {
    type Creators = UserSideInput.Creators;
    type Collection = {
        address: Pubkey;
        verified: boolean;
    };
    type Uses = Common.Uses;
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
        uses?: Common.Uses | undefined;
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
        attributes?: Common.Attribute | undefined;
        creators?: Creators[] | undefined;
        uses?: Common.Uses | undefined;
        dateTime?: Date | undefined;
    };
}

declare namespace Converter$b {
    namespace Collection {
        const intoInfraSide: (input: Option<UserSideInput.Collection> | undefined) => Option<InfraSideInput.Collection>;
        const intoUserSide: (output: Option<InfraSideOutput.Collection>) => UserSideOutput.Collection | undefined;
    }
}

declare namespace Converter$a {
    namespace Creators {
        const intoInfraSide: (input: Option<UserSideInput.Creators[]> | undefined) => Option<InfraSideInput.Creators[]>;
        const intoUserSide: (output: Option<InfraSideOutput.Creator[]>) => UserSideOutput.Creators[] | undefined;
    }
}

declare namespace CoreUserSideOutput {
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
}

declare namespace CoreInfraSideOutput {
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
}

type PostTokenAccount = {
    account: string;
    owner: string;
};

declare namespace Converter$9 {
    namespace Memo {
        const intoUserSide: (output: CoreInfraSideOutput.Memo, meta: ParsedTransactionWithMeta, outputTransfer?: CoreInfraSideOutput.TransferChecked, mappingTokenAccount?: PostTokenAccount[]) => CoreUserSideOutput.History | undefined;
    }
}

declare namespace Converter$8 {
    namespace Mint {
        const intoUserSide: (output: CoreInfraSideOutput.MintTo, meta: ParsedTransactionWithMeta) => CoreUserSideOutput.History | undefined;
    }
}

declare namespace Converter$7 {
    namespace NftMetadata {
        const intoInfraSide: (input: UserSideInput.NftMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
        const intoUserSide: (output: InfraSideOutput.OnchainAndOffchain, tokenAmount: string) => UserSideOutput.NftMetadata;
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
        const intoInfraSide: (input: UserSideInput.Properties | undefined, callbackFunc: (filePath: FileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>, storageType: StorageType, feePayer?: Secret) => Promise<InfraSideInput.Properties>;
    }
}

declare namespace Converter$5 {
    namespace Royalty {
        const THRESHOLD = 100;
        const intoInfraSide: (percentage: number) => number;
    }
}

declare namespace Converter$4 {
    namespace TokenMetadata {
        const intoInfraSide: (input: UserSideInput.TokenMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
        const intoUserSide: (output: InfraSideOutput.OnchainAndOffchain, tokenAmount: string) => UserSideOutput.TokenMetadata;
        const deleteNullStrings: (str: string) => string;
    }
}

declare namespace Converter$3 {
    namespace TransferChecked {
        const intoUserSide: (output: CoreInfraSideOutput.TransferChecked, meta: ParsedTransactionWithMeta, mappingTokenAccount?: PostTokenAccount[]) => CoreUserSideOutput.History | undefined;
    }
}

declare namespace Converter$2 {
    namespace Transfer {
        const intoUserSide: (output: CoreInfraSideOutput.Transfer, meta: ParsedTransactionWithMeta) => CoreUserSideOutput.History | undefined;
    }
}

declare namespace Converter$1 {
    namespace Uses {
        const intoUserSide: (output: Option<InfraSideOutput.Uses>) => UserSideOutput.Uses | undefined;
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
