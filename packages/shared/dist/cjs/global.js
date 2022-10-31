"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Try = exports.isPromise = exports.isNode = exports.isBrowser = exports.sleep = exports.debugLog = void 0;
const web3_js_1 = require("@solana/web3.js");
const _1 = require("./");
const instruction_batch_1 = require("./instruction-batch");
const bs58_1 = __importDefault(require("bs58"));
require("./types/global");
/**
 * senTransaction() TransactionInstruction
 *
 * @see {@link types/global.ts}
 * @returns Promise<Result<string, Error>>
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* @ts-ignore */
Array.prototype.submit = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const instructions = [];
        // dont use forEach
        // It is not possible to stop the process by RETURN in the middle of the process.
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            let i = 0;
            for (const obj of this) {
                if (obj.isErr) {
                    const errorMess = obj.error.message;
                    throw Error(`[Array index of caught 'Result.err': ${i}]${errorMess}`);
                }
                else if (obj.isOk) {
                    instructions.push(obj.value);
                }
                else {
                    instructions.push(obj);
                }
                i++;
            }
            return instruction_batch_1.InstructionBatch.submit(instructions);
        }));
    });
};
/**
 * PubKey(@solana-suite) to PublicKey(@solana/web3.js)
 *
 * @see {@link types/global.ts}
 * @returns PublicKey
 */
String.prototype.toPublicKey = function () {
    return new web3_js_1.PublicKey(this);
};
/**
 * Secret(@solana-suite) to Keypair(@solana/web3.js)
 *
 * @see {@link types/global.ts}
 * @returns Keypair
 */
String.prototype.toKeypair = function () {
    const decoded = bs58_1.default.decode(this);
    return web3_js_1.Keypair.fromSecretKey(decoded);
};
/**
 * Create explorer url for account address or signature
 *
 * @see {@link types/global.ts}
 * @returns string
 */
String.prototype.toExplorerUrl = function () {
    const endPointUrl = _1.Node.getConnection().rpcEndpoint;
    (0, exports.debugLog)('# toExplorerUrl rpcEndpoint:', endPointUrl);
    let cluster = '';
    if (endPointUrl === _1.Constants.EndPointUrl.prd) {
        cluster = _1.Constants.Cluster.prd;
    }
    else if (endPointUrl === _1.Constants.EndPointUrl.prd2) {
        cluster = _1.Constants.Cluster.prd;
    }
    else if (endPointUrl === _1.Constants.EndPointUrl.test) {
        cluster = _1.Constants.Cluster.test;
    }
    else if (endPointUrl === _1.Constants.EndPointUrl.dev) {
        cluster = _1.Constants.Cluster.dev;
    }
    else {
        cluster = _1.Constants.Cluster.dev;
    }
    const address = this.toString();
    try {
        /* tslint:disable-next-line */
        new web3_js_1.PublicKey(address);
        return `https://solscan.io/account/${address}?cluster=${cluster}`;
    }
    catch (_) {
        return `https://solscan.io/tx/${address}?cluster=${cluster}`;
    }
};
/**
 * LAMPORTS to SOL
 *
 * @see {@link types/global.ts}
 * @returns number
 */
Number.prototype.toSol = function () {
    return this / web3_js_1.LAMPORTS_PER_SOL;
};
/**
 * SOL to LAMPORTS
 *
 * @see {@link types/global.ts}
 * @returns number
 */
Number.prototype.toLamports = function () {
    return this * web3_js_1.LAMPORTS_PER_SOL;
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
const debugLog = (data1, data2 = '', data3 = '', data4 = '') => {
    if (_1.Constants.isDebugging || process.env.DEBUG == 'true') {
        console.log('[DEBUG]', data1, data2, data3, data4);
    }
};
exports.debugLog = debugLog;
/**
 * sleep timer
 *
 * @param {number} sec
 * @returns Promise<number>
 */
const sleep = (sec) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((r) => setTimeout(r, sec * 1000));
});
exports.sleep = sleep;
/**
 * Node.js or Browser js
 *
 * @returns boolean
 */
const isBrowser = () => {
    return (typeof window !== 'undefined' && typeof window.document !== 'undefined');
};
exports.isBrowser = isBrowser;
/**
 * Node.js or Browser js
 *
 * @returns boolean
 */
const isNode = () => {
    return (typeof process !== 'undefined' &&
        process.versions != null &&
        process.versions.node != null);
};
exports.isNode = isNode;
/**
 * argument is promise or other
 *
 * @param {unknown} obj
 * @returns boolean
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const isPromise = (obj) => {
    return (!!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function');
};
exports.isPromise = isPromise;
function Try(input) {
    try {
        const v = input();
        if ((0, exports.isPromise)(v)) {
            return v.then((x) => _1.Result.ok(x), (err) => _1.Result.err(err));
        }
        else {
            return _1.Result.ok(v);
        }
    }
    catch (e) {
        if (e instanceof Error) {
            return _1.Result.err(e);
        }
        return _1.Result.err(Error(e));
    }
}
exports.Try = Try;
