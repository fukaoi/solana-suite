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
exports.convertTimestampToDateTime = exports.Try = exports.isPromise = exports.isNode = exports.isBrowser = exports.sleep = exports.debugLog = exports.overwriteObject = void 0;
const bs58_1 = __importDefault(require("bs58"));
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("./constants");
const node_1 = require("./node");
const result_1 = require("./result");
const batch_submit_1 = require("./instruction/batch-submit");
const keypair_account_1 = require("./keypair-account");
const bignumber_js_1 = require("bignumber.js");
const global_1 = require("./types/global");
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
            return batch_submit_1.Instruction.batchSubmit(instructions);
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
    if (!keypair_account_1.KeypairAccount.isPubkey(this.toString())) {
        throw Error(`No match KeyPair.PubKey: ${this.toString()}`);
    }
    return new web3_js_1.PublicKey(this);
};
/**
 * Secret(@solana-suite) to Keypair(@solana/web3.js)
 *
 * @see {@link types/global.ts}
 * @returns Keypair
 */
String.prototype.toKeypair = function () {
    if (!keypair_account_1.KeypairAccount.isSecret(this.toString())) {
        throw Error(`No match KeyPair.Secret: ${this.toString()}`);
    }
    const decoded = bs58_1.default.decode(this);
    return web3_js_1.Keypair.fromSecretKey(decoded);
};
/**
 * Create explorer url for account address or signature
 *
 * @see {@link types/global.ts}
 * @returns string
 */
String.prototype.toExplorerUrl = function (explorer = global_1.Explorer.Solscan) {
    const endPointUrl = node_1.Node.getConnection().rpcEndpoint;
    (0, exports.debugLog)('# toExplorerUrl rpcEndpoint:', endPointUrl);
    let cluster = '';
    if (endPointUrl === constants_1.Constants.EndPointUrl.prd) {
        cluster = constants_1.Constants.Cluster.prd;
    }
    else if (endPointUrl === constants_1.Constants.EndPointUrl.test) {
        cluster = constants_1.Constants.Cluster.test;
    }
    else if (endPointUrl === constants_1.Constants.EndPointUrl.dev) {
        cluster = constants_1.Constants.Cluster.dev;
    }
    else {
        cluster = constants_1.Constants.Cluster.dev;
    }
    const address = this.toString();
    let url;
    if (keypair_account_1.KeypairAccount.isPubkey(address)) {
        if (explorer === global_1.Explorer.SolanaFM) {
            url = `https://solana.fm/address/${address}?cluster=${cluster}`;
        }
        else {
            url = `https://solscan.io/account/${address}?cluster=${cluster}`;
        }
    }
    else {
        if (explorer === global_1.Explorer.SolanaFM) {
            url = `https://solana.fm/tx/${address}?cluster=${cluster}`;
        }
        else {
            url = `https://solscan.io/tx/${address}?cluster=${cluster}`;
        }
    }
    return url;
};
/**
 * LAMPORTS to SOL
 *
 * @see {@link types/global.ts}
 * @returns number
 */
Number.prototype.toSol = function () {
    return (0, bignumber_js_1.BigNumber)(this)
        .div(web3_js_1.LAMPORTS_PER_SOL)
        .toNumber();
};
/**
 * SOL to LAMPORTS
 *
 * @see {@link types/global.ts}
 * @returns number
 */
Number.prototype.toLamports = function () {
    return (0, bignumber_js_1.BigNumber)(this)
        .times(web3_js_1.LAMPORTS_PER_SOL)
        .toNumber();
};
/**
 * Overwrite JS Object
 *
 * @param {unknown} object
 * @param {OverwriteObject[]} targets
 * @returns Object
 */
const overwriteObject = (object, targets) => {
    const that = object;
    targets.forEach((target) => {
        delete that[target.existsKey];
        that[target.will.key] = target.will.value;
    });
    return that;
};
exports.overwriteObject = overwriteObject;
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
    if (constants_1.Constants.isDebugging === 'true' || process.env.DEBUG === 'true') {
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
function Try(input, finallyInput) {
    try {
        const v = input();
        if ((0, exports.isPromise)(v)) {
            return v.then((x) => result_1.Result.ok(x), (err) => result_1.Result.err(err));
        }
        else {
            return result_1.Result.ok(v);
        }
    }
    catch (e) {
        if (e instanceof Error) {
            return result_1.Result.err(e);
        }
        return result_1.Result.err(Error(e));
    }
    finally {
        if (finallyInput) {
            (0, exports.debugLog)('# finally input:', finallyInput);
            finallyInput();
        }
    }
}
exports.Try = Try;
/**
 * argument is promise or other
 *
 * @param {number|undefined} created_at
 * @returns Date | undefined
 */
const convertTimestampToDateTime = (created_at) => {
    if (created_at) {
        return new Date(created_at * 1000);
    }
    return;
};
exports.convertTimestampToDateTime = convertTimestampToDateTime;
//# sourceMappingURL=global.js.map