"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const _1 = require("./");
Array.prototype.submit = async function () {
    const instructions = [];
    for (const [i, obj] of this) {
        if (obj.isErr) {
            return _1.Result.err(Error(`[Array index: ${i}]${obj.error.message}`));
        }
        else if (obj.isOk) {
            instructions.push(obj.value);
        }
        else {
            instructions.push(obj);
        }
    }
    return await _1.Instruction.batchSubmit(instructions);
};
String.prototype.toPubkey = function () {
    return new web3_js_1.PublicKey(this);
};
String.prototype.toKeypair = function () {
    const decoded = bs58_1.default.decode(this);
    return web3_js_1.Keypair.fromSecretKey(decoded);
};
String.prototype.toExplorerUrl = function () {
    try {
        /* tslint:disable-next-line */
        new web3_js_1.PublicKey(this);
        return `https://explorer.solana.com/address/${this}?cluster=${_1.Constants.currentNetwork}`;
    }
    catch (_) {
        return `https://explorer.solana.com/tx/${this}?cluster=${_1.Constants.currentNetwork}`;
    }
};
console.debug = (data, data2 = '', data3 = '') => {
    if (_1.Constants.isDebugging)
        console.log(`\u001b[34m`, data, `\u001b[35m`, data2, `\u001b[36m`, data3);
};
console.error = (data, data2 = '', data3 = '') => {
    console.log(`\u001b[31m`, data, `\u001b[4m\u001b[31m`, data2, `\u001b[0m\u001b[31m`, data3);
};
const tryCatch = (fn) => {
    try {
        return _1.Result.ok(fn());
    }
    catch (e) {
        return _1.Result.err(e);
    }
};
exports.tryCatch = tryCatch;
