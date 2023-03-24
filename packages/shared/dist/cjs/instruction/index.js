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
exports.Instruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const __1 = require("../");
const define_1 = require("./define");
class Instruction {
    constructor(instructions, signers, feePayer, data) {
        this.submit = (feePayer) => __awaiter(this, void 0, void 0, function* () {
            return (0, __1.Try)(() => __awaiter(this, void 0, void 0, function* () {
                if (!(this instanceof Instruction)) {
                    throw Error('only Instruction object that can use this');
                }
                const transaction = new web3_js_1.Transaction();
                const blockhashObj = yield __1.Node.getConnection().getLatestBlockhash();
                transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
                // transaction.blockhash = blockhashObj.blockhash;
                transaction.recentBlockhash = blockhashObj.blockhash;
                let finalSigners = this.signers;
                if (feePayer) {
                    // if (this.feePayer) {
                    // transaction.feePayer = this.feePayer.publicKey;
                    // finalSigners = [this.feePayer, ...this.signers];
                    transaction.feePayer = feePayer === null || feePayer === void 0 ? void 0 : feePayer.toKeypair().publicKey;
                    transaction.partialSign(feePayer.toKeypair());
                    finalSigners = [...this.signers];
                }
                this.instructions.forEach((inst) => transaction.add(inst));
                const options = {
                    maxRetries: define_1.MAX_RETRIES,
                };
                return yield (0, web3_js_1.sendAndConfirmTransaction)(__1.Node.getConnection(), transaction, finalSigners, options);
            }));
        });
        this.instructions = instructions;
        this.signers = signers;
        this.feePayer = feePayer;
        this.data = data;
    }
}
exports.Instruction = Instruction;
//# sourceMappingURL=index.js.map