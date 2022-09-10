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
exports.isNode = exports.isBrowser = exports.sleep = exports.debugLog = void 0;
const web3_js_1 = require("@solana/web3.js");
const _1 = require("./");
const _instruction_1 = require("./internals/_instruction");
const bs58_1 = __importDefault(require("bs58"));
require("./types/global");
// @ts-ignore
Array.prototype.submit = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const instructions = [];
        // dont use forEach
        // It is not possible to stop the process by RETURN in the middle of the process.
        let i = 0;
        for (const obj of this) {
            if (obj.isErr) {
                return _1.Result.err(Error(`[Array index of caught 'Result.err': ${i}]${obj.error.message}`));
            }
            else if (obj.isOk) {
                instructions.push(obj.value);
            }
            else {
                instructions.push(obj);
            }
            i++;
        }
        return yield _instruction_1.Internals_Instruction.batchSubmit(instructions);
    });
};
String.prototype.toPublicKey = function () {
    return new web3_js_1.PublicKey(this);
};
String.prototype.toKeypair = function () {
    const decoded = bs58_1.default.decode(this);
    return web3_js_1.Keypair.fromSecretKey(decoded);
};
String.prototype.toExplorerUrl = function () {
    let cluster = _1.Constants.currentCluster;
    if (_1.Constants.currentCluster === 'localhost-devnet') {
        cluster = 'devnet';
    }
    try {
        /* tslint:disable-next-line */
        new web3_js_1.PublicKey(this);
        return `https://solscan.io/account/${this}?cluster=${cluster}`;
    }
    catch (_) {
        return `https://solscan.io/tx/${this}?cluster=${cluster}`;
    }
};
Number.prototype.toSol = function () {
    return this / web3_js_1.LAMPORTS_PER_SOL;
};
Number.prototype.toLamports = function () {
    return this * web3_js_1.LAMPORTS_PER_SOL;
};
const debugLog = (data, data2 = '', data3 = '') => {
    if (_1.Constants.isDebugging || process.env.DEBUG) {
        console.log('[DEBUG]', data, data2, data3);
    }
};
exports.debugLog = debugLog;
const sleep = (sec) => __awaiter(void 0, void 0, void 0, function* () { return new Promise((r) => setTimeout(r, sec * 1000)); });
exports.sleep = sleep;
exports.isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
exports.isNode = typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null;
