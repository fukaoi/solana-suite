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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolNative = void 0;
const web3_js_1 = require("@solana/web3.js");
const transaction_1 = require("./transaction");
var SolNative;
(function (SolNative) {
    SolNative.transfer = (source, signers, destination, amount) => (instruction) => __awaiter(this, void 0, void 0, function* () {
        const sol = amount * web3_js_1.LAMPORTS_PER_SOL;
        const fn = transaction_1.Transaction.send(source, signers, destination, sol);
        return instruction ? yield fn([instruction]) : yield fn();
    });
})(SolNative = exports.SolNative || (exports.SolNative = {}));
