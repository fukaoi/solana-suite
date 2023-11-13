import { PublicKey, Commitment } from '@solana/web3.js';
import { R as Result } from './index-b20a9ead.js';
export { A as Account, b as FilterOptions, F as FilterType, K as KeypairAccount, g as Memo, d as MintTo, e as MintToChecked, M as ModuleName, N as Node, O as OwnerInfo, c as PostTokenAccount, P as Pubkey, S as Secret, T as Transfer, f as TransferChecked, V as Validator, a as ValidatorError, W as WithMemo } from './index-b20a9ead.js';
import 'src';
import 'bn.js';
import '@metaplex-foundation/mpl-token-metadata';

declare namespace Constants {
    const currentCluster: string;
    const customClusterUrl: never[];
    const isDebugging: string;
    const nftStorageApiKey: string;
    enum Cluster {
        prd = "mainnet-beta",
        prdMetaplex = "mainnet-beta-metaplex",
        dev = "devnet",
        test = "testnet",
        localhost = "localhost-devnet"
    }
    enum EndPointUrl {
        prd = "https://api.mainnet-beta.solana.com",
        prdMetaplex = "https://api.metaplex.solana.com",
        dev = "https://api.devnet.solana.com",
        test = "https://api.testnet.solana.com",
        localhost = "http://api.devnet.solana.com"
    }
    const switchCluster: (param: {
        cluster?: string;
        customClusterUrl?: string[];
    }) => string;
    const switchBundlr: (env: string) => string;
    const WRAPPED_TOKEN_PROGRAM_ID: PublicKey;
    const MEMO_PROGRAM_ID: PublicKey;
    const METAPLEX_PROGRAM_ID: PublicKey;
    const COMMITMENT: Commitment;
    const NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE";
    const NFT_STORAGE_GATEWAY_URL = "https://ipfs.io/ipfs";
    const IRYS_GATEWAY_URL = "https://gateway.irys.xyz";
    const BUNDLR_NETWORK_URL: string;
}

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

export { Constants, Result, Try, convertTimestampToDateTime, debugLog, isBrowser, isNode, isPromise, overwriteObject, sleep };
