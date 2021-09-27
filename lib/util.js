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
exports.Util = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const constants_1 = require("./constants");
console.debug = (data, data2 = '') => {
    if (process.env.NODE_ENV === 'development'
        || process.env.NODE_ENV === 'testnet') {
        console.log(`\u001b[35m${data}`, `\u001b[36m${data2}`);
    }
};
var Util;
(function (Util) {
    let connection;
    Util.isEmpty = (val) => {
        if (val === null || val === undefined)
            return true;
        if (Array.isArray(val))
            return val.length > 0 ? false : true;
        if (typeof val === 'number')
            return false;
        console.log(Object.values(val).length);
        if (!Object.values(val).length)
            return false;
        return !Object.keys(val).length;
    };
    Util.sleep = (sec) => __awaiter(this, void 0, void 0, function* () { return new Promise(r => setTimeout(r, sec * 1000)); });
    Util.getConnection = () => {
        if (connection)
            return connection;
        connection = new web3_js_1.Connection(constants_1.Constants.API_URL);
        return connection;
    };
    Util.getApiUrl = () => constants_1.Constants.API_URL;
    Util.createKeypair = (secret) => {
        const decoded = bs58_1.default.decode(secret);
        return web3_js_1.Keypair.fromSecretKey(decoded);
    };
    Util.createSigners = (signerSecrets) => signerSecrets.map(s => Util.createKeypair(s));
    Util.dateFormat = () => {
        const t = new Date();
        return t.getFullYear() + '-' +
            ('0' + (t.getMonth() + 1)).slice(-2) + '-' +
            ('0' + (t.getDate())).slice(-2) + '/' +
            ('0' + t.getHours()).slice(-2) + ':' +
            ('0' + t.getMinutes()).slice(-2) + ':' +
            ('0' + t.getSeconds()).slice(-2);
    };
})(Util = exports.Util || (exports.Util = {}));
