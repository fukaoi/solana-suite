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
exports.sleep = exports.tryCatch = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const _1 = require("./");
// @ts-ignore
Array.prototype.submit = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const instructions = [];
        this.forEach((obj, i) => {
            if (obj.isErr) {
                return _1.Result.err(Error(`[Array index: ${i}]${obj.error.message}`));
            }
            else if (obj.isOk) {
                instructions.push(obj.value);
            }
            else {
                instructions.push(obj);
            }
        });
        return yield _1.Instruction.batchSubmit(instructions);
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
console.debug = (data, data2 = '', data3 = '') => _1.Constants.isDebugging && console.log(data, data2, data3);
const tryCatch = (fn) => {
    try {
        return _1.Result.ok(fn());
    }
    catch (e) {
        return _1.Result.err(e);
    }
};
exports.tryCatch = tryCatch;
const sleep = (sec) => __awaiter(void 0, void 0, void 0, function* () { return new Promise(r => setTimeout(r, sec * 1000)); });
exports.sleep = sleep;
