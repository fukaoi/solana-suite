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
const node_1 = require("./node");
const constants_1 = require("./constants");
var Transaction;
(function (Transaction) {
    const parseAccountData = (data) => {
        const amountData = data.slice(64, 74);
        const amount = amountData.readUInt32LE(0) + (amountData.readUInt32LE(4) * Math.pow(2, 32));
        return {
            token: new web3_js_1.PublicKey(data.slice(0, 32)),
            owner: new web3_js_1.PublicKey(data.slice(32, 64)),
            amount
        };
    };
    Transaction.get = (signature) => __awaiter(this, void 0, void 0, function* () { return yield node_1.Node.getConnection().getParsedConfirmedTransaction(signature); });
    Transaction.getAll = (pubkey) => __awaiter(this, void 0, void 0, function* () {
        const transactions = yield node_1.Node.getConnection().getConfirmedSignaturesForAddress2(pubkey);
        const parsedSig = [];
        for (const tx of transactions) {
            const res = yield Transaction.get(tx.signature);
            res !== null && parsedSig.push(res);
        }
        return parsedSig;
    });
    Transaction.subscribeAccount = (pubkey, 
    // callback: (data: SubscribeData<Buffer>) => void
    callback) => {
        return node_1.Node.getConnection().onAccountChange(pubkey, callback, 'confirmed');
        // return Node.getConnection().onAccountChange(pubkey, (data, _) => {
        // callback(data, _);
        // console.log(parseAccountData(data.data));
        // // const subscribeData: SubscribeData<ParsedAccountData> = {
        // // lamports: data.lamports,
        // // owner: data.owner.toBase58(),
        // // parsed: data
        // // }
        // // callback(subscribeData);
        // }, 'singleGossip');
    };
    Transaction.unsubscribeAccount = (subscribeId) => node_1.Node.getConnection().removeAccountChangeListener(subscribeId);
    Transaction.sendInstructions = (signers, instructions) => __awaiter(this, void 0, void 0, function* () {
        const conn = node_1.Node.getConnection();
        const tx = new web3_js_1.Transaction().add(instructions[0]);
        if (instructions[1]) {
            instructions.slice(1, instructions.length)
                .forEach((st) => tx.add(st));
        }
        const options = {
            skipPreflight: true,
            commitment: constants_1.Constants.COMMITMENT,
        };
        return (0, web3_js_1.sendAndConfirmTransaction)(conn, tx, signers, options);
    });
    Transaction.send = (source, signers, destination, amount) => (instructions) => __awaiter(this, void 0, void 0, function* () {
        const params = web3_js_1.SystemProgram.transfer({
            fromPubkey: source,
            toPubkey: destination,
            lamports: amount,
        });
        const conn = node_1.Node.getConnection();
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
