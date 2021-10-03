"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
String.prototype.toPubKey = function () {
    return new web3_js_1.PublicKey(this);
};
String.prototype.toKeypair = function () {
    const decoded = bs58_1.default.decode(this);
    return web3_js_1.Keypair.fromSecretKey(decoded);
};
