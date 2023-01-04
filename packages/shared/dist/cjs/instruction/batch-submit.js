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
const __1 = require("../");
const define_1 = require("./define");
//@internals
class Instruction {
}
exports.Instruction = Instruction;
_a = Instruction;
Instruction.batchSubmit = (arr) => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    for (const a of arr) {
        if (!a.instructions && !a.signers) {
            throw Error(`only Instruction object that can use batchSubmit().
            Index: ${i}, Set value: ${JSON.stringify(a)}`);
        }
        i++;
    }
    const instructions = arr.flatMap((a) => a.instructions);
    const signers = arr.flatMap((a) => a.signers);
    const feePayers = arr.filter((a) => a.feePayer !== undefined);
    let feePayer = signers[0];
    if (feePayers.length > 0 && feePayers[0].feePayer) {
        feePayer = feePayers[0].feePayer;
    }
    const transaction = new web3_js_1.Transaction();
    let finalSigners = signers;
    if (feePayer) {
        transaction.feePayer = feePayer.publicKey;
        finalSigners = [feePayer, ...signers];
    }
    instructions.map((inst) => transaction.add(inst));
    const options = {
        maxRetries: define_1.MAX_RETRIES,
    };
    return yield (0, web3_js_1.sendAndConfirmTransaction)(__1.Node.getConnection(), transaction, finalSigners, options);
});
//# sourceMappingURL=batch-submit.js.map