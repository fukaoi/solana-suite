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
exports.PartialSignInstruction = exports.Instruction = exports.MAX_RETRIES = void 0;
const web3_js_1 = require("@solana/web3.js");
const _1 = require("./");
exports.MAX_RETRIES = 3;
class Instruction {
    constructor(instructions, signers, feePayer, data) {
        this.submit = () => __awaiter(this, void 0, void 0, function* () {
            if (!(this instanceof Instruction)) {
                return _1.Result.err(Error('only Instruction object that can use this'));
            }
            const transaction = new web3_js_1.Transaction();
            let finalSigners = this.signers;
            if (this.feePayer) {
                transaction.feePayer = this.feePayer.publicKey;
                finalSigners = [this.feePayer, ...this.signers];
            }
            this.instructions.map((inst) => transaction.add(inst));
            const options = {
                maxRetries: exports.MAX_RETRIES,
            };
            return yield (0, web3_js_1.sendAndConfirmTransaction)(_1.Node.getConnection(), transaction, finalSigners, options)
                .then(_1.Result.ok)
                .catch(_1.Result.err);
        });
        this.instructions = instructions;
        this.signers = signers;
        this.feePayer = feePayer;
        this.data = data;
    }
}
exports.Instruction = Instruction;
class PartialSignInstruction {
    constructor(instructions) {
        this.submit = (feePayer) => __awaiter(this, void 0, void 0, function* () {
            if (!(this instanceof PartialSignInstruction)) {
                return _1.Result.err(Error('only PartialSignInstruction object that can use this'));
            }
            const decode = Buffer.from(this.hexInstruction, 'hex');
            const transactionFromJson = web3_js_1.Transaction.from(decode);
            transactionFromJson.partialSign(feePayer);
            const options = {
                maxRetries: exports.MAX_RETRIES,
            };
            const wireTransaction = transactionFromJson.serialize();
            return yield _1.Node.getConnection()
                .sendRawTransaction(wireTransaction, options)
                .then(_1.Result.ok)
                .catch(_1.Result.err);
        });
        this.hexInstruction = instructions;
    }
}
exports.PartialSignInstruction = PartialSignInstruction;
