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
exports.PartialSignInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const node_1 = require("./node");
const global_1 = require("./global");
const define_1 = require("./instruction/define");
class PartialSignInstruction {
    constructor(instructions) {
        this.submit = (feePayer) => __awaiter(this, void 0, void 0, function* () {
            return (0, global_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
                if (!(this instanceof PartialSignInstruction)) {
                    throw Error('only PartialSignInstruction object that can use this');
                }
                const decode = Buffer.from(this.hexInstruction, 'hex');
                const transactionFromJson = web3_js_1.Transaction.from(decode);
                transactionFromJson.partialSign(feePayer);
                const options = {
                    maxRetries: define_1.MAX_RETRIES,
                };
                const wireTransaction = transactionFromJson.serialize();
                return yield node_1.Node.getConnection().sendRawTransaction(wireTransaction, options);
            }));
        });
        this.hexInstruction = instructions;
    }
}
exports.PartialSignInstruction = PartialSignInstruction;
