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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const _1 = require("./");
const MAX_RETRIES = 3;
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
            this.instructions.map(inst => transaction.add(inst));
            const options = {
                maxRetries: MAX_RETRIES
            };
            const rentExempt = yield _1.Node.getConnection().getMinimumBalanceForRentExemption(90);
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
_a = Instruction;
// @internal
Instruction.batchSubmit = (arr) => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    for (const a of arr) {
        if (!a.instructions && !a.signers) {
            return _1.Result.err(Error(`only Instruction object that can use batchSubmit().
            Setted: ${a}, Index: ${i}`));
        }
        i++;
    }
    const instructions = arr.flatMap(a => a.instructions);
    const signers = arr.flatMap(a => a.signers);
    const feePayers = arr.filter(a => a.feePayer !== undefined);
    let feePayer = signers[0];
    if (feePayers.length > 0) {
        feePayer = feePayers[0].feePayer;
    }
    const transaction = new web3_js_1.Transaction();
    let finalSigners = signers;
    if (feePayer) {
        transaction.feePayer = feePayer.publicKey;
        finalSigners = [feePayer, ...signers];
    }
    instructions.map(inst => transaction.add(inst));
    const options = {
        maxRetries: MAX_RETRIES
    };
    return yield (0, web3_js_1.sendAndConfirmTransaction)(_1.Node.getConnection(), transaction, finalSigners, options)
        .then(_1.Result.ok)
        .catch(_1.Result.err);
});
