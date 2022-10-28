var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Constants, Node, Result } from './';
import { Internals_Instruction } from './internals/_instruction';
import bs from 'bs58';
import './types/global';
/**
 * senTransaction() TransactionInstruction
 *
 * @returns Promise<Result<string, Error>>
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* @ts-ignore */
Array.prototype.submit = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const instructions = [];
        // dont use forEach
        // It is not possible to stop the process by RETURN in the middle of the process.
        let i = 0;
        for (const obj of this) {
            if (obj.isErr) {
                const errorMess = obj.error.message;
                return Result.err(Error(`[Array index of caught 'Result.err': ${i}]${errorMess}`));
            }
            else if (obj.isOk) {
                instructions.push(obj.value);
            }
            else {
                instructions.push(obj);
            }
            i++;
        }
        return yield Internals_Instruction.batchSubmit(instructions);
    });
};
/**
 * PubKey(@solana-suite) to PublicKey(@solana/web3.js)
 *
 * @returns PublicKey
 */
String.prototype.toPublicKey = function () {
    return new PublicKey(this);
};
/**
 * Secret(@solana-suite) to Keypair(@solana/web3.js)
 *
 * @returns Keypair
 */
String.prototype.toKeypair = function () {
    const decoded = bs.decode(this);
    return Keypair.fromSecretKey(decoded);
};
/**
 * Create explorer url for account address or signature
 *
 * @returns string
 */
String.prototype.toExplorerUrl = function () {
    const endPointUrl = Node.getConnection().rpcEndpoint;
    debugLog('# toExplorerUrl rpcEndpoint:', endPointUrl);
    let cluster = '';
    if (endPointUrl === Constants.EndPointUrl.prd) {
        cluster = Constants.Cluster.prd;
    }
    else if (endPointUrl === Constants.EndPointUrl.prd2) {
        cluster = Constants.Cluster.prd;
    }
    else if (endPointUrl === Constants.EndPointUrl.test) {
        cluster = Constants.Cluster.test;
    }
    else if (endPointUrl === Constants.EndPointUrl.dev) {
        cluster = Constants.Cluster.dev;
    }
    else {
        cluster = Constants.Cluster.dev;
    }
    const address = this.toString();
    try {
        /* tslint:disable-next-line */
        new PublicKey(address);
        return `https://solscan.io/account/${address}?cluster=${cluster}`;
    }
    catch (_) {
        return `https://solscan.io/tx/${address}?cluster=${cluster}`;
    }
};
/**
 * LAMPORTS to SOL
 *
 * @returns number
 */
Number.prototype.toSol = function () {
    return this / LAMPORTS_PER_SOL;
};
/**
 * SOL to LAMPORTS
 *
 * @returns number
 */
Number.prototype.toLamports = function () {
    return this * LAMPORTS_PER_SOL;
};
/**
 * Display log for solana-suite-config.js
 *
 * @param {unknown} data1
 * @param {unknown} data2
 * @param {unknown} data3
 * @param {unknown} data4
 * @returns void
 */
export const debugLog = (data1, data2 = '', data3 = '', data4 = '') => {
    if (Constants.isDebugging || process.env.DEBUG == 'true') {
        console.log('[DEBUG]', data1, data2, data3, data4);
    }
};
/**
 * sleep timer
 *
 * @param {number} sec
 * @returns Promise<number>
 */
export const sleep = (sec) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((r) => setTimeout(r, sec * 1000));
});
/**
 * Node.js or Browser js
 *
 * @returns boolean
 */
export const isBrowser = () => {
    return (typeof window !== 'undefined' && typeof window.document !== 'undefined');
};
/**
 * Node.js or Browser js
 *
 * @returns boolean
 */
export const isNode = () => {
    return (typeof process !== 'undefined' &&
        process.versions != null &&
        process.versions.node != null);
};
/**
 * argument is promise or other
 *
 * @param {unknown} obj
 * @returns boolean
 */
export const isPromise = (obj) => {
    return (!!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function');
};
export function Try(input) {
    try {
        const v = input();
        if (isPromise(v)) {
            return v.then((x) => Result.ok(x), (err) => Result.err(err));
        }
        else {
            return Result.ok(v);
        }
    }
    catch (e) {
        if (e instanceof Error) {
            return Result.err(e);
        }
        return Result.err(Error(e));
    }
}
