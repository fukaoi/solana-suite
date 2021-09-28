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
exports.Transaction = void 0;
const web3_js_1 = require("@solana/web3.js");
const util_1 = require("./util");
const constants_1 = require("./constants");
var Transaction;
(function (Transaction) {
    Transaction.get = (signature) => __awaiter(this, void 0, void 0, function* () { return yield util_1.Util.getConnection().getParsedConfirmedTransaction(signature); });
    Transaction.getAll = (pubkeyStr) => __awaiter(this, void 0, void 0, function* () {
        const pubkey = new web3_js_1.PublicKey(pubkeyStr);
        const transactions = yield util_1.Util.getConnection().getConfirmedSignaturesForAddress2(pubkey);
        const parsedSig = [];
        for (const tx of transactions) {
            const res = yield Transaction.get(tx.signature);
            res !== null && parsedSig.push(res);
        }
        return parsedSig;
    });
    Transaction.subscribeAccount = (pubkey, callback) => util_1.Util.getConnection().onAccountChange(new web3_js_1.PublicKey(pubkey), callback);
    Transaction.unsubscribeAccount = (subscribeId) => util_1.Util.getConnection().removeAccountChangeListener(subscribeId);
    Transaction.sendInstructions = (signers, instructions) => __awaiter(this, void 0, void 0, function* () {
        const conn = util_1.Util.getConnection();
        const tx = new web3_js_1.Transaction().add(instructions[0]);
        if (instructions[1]) {
            instructions.slice(1, instructions.length).forEach((st) => tx.add(st));
        }
        const options = {
            skipPreflight: true,
            commitment: constants_1.Constants.COMMITMENT,
        };
        return (0, web3_js_1.sendAndConfirmTransaction)(conn, tx, signers, options);
    });
    Transaction.send = (sourcePublicKey, signers, destPublicKey, amount) => (instructions) => __awaiter(this, void 0, void 0, function* () {
        const params = web3_js_1.SystemProgram.transfer({
            fromPubkey: sourcePublicKey,
            toPubkey: destPublicKey,
            lamports: amount,
        });
        const conn = util_1.Util.getConnection();
        const tx = new web3_js_1.Transaction().add(params);
        if (instructions) {
            instructions.forEach((st) => tx.add(st));
        }
        const options = {
            skipPreflight: true,
            commitment: constants_1.Constants.COMMITMENT,
        };
        return (0, web3_js_1.sendAndConfirmTransaction)(conn, tx, signers, options);
    });
})(Transaction = exports.Transaction || (exports.Transaction = {}));
