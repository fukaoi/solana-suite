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
exports.Memo = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const transaction_1 = require("./transaction");
const constants_1 = require("./constants");
var Memo;
(function (Memo) {
    Memo.decode = (encoded) => bs58_1.default.decode(encoded).toString();
    Memo.encode = (data) => Buffer.from(data);
    Memo.createInstruction = (data) => {
        return new web3_js_1.TransactionInstruction({
            programId: constants_1.Constants.MEMO_PROGRAM_ID,
            data: Memo.encode(data),
            keys: []
        });
    };
    Memo.parseInstruction = (tx) => {
        const res = tx.transaction.message.instructions.filter(d => {
            const value = d;
            return value.program === 'spl-memo';
        });
        return res[0].parsed;
    };
    Memo.own = (instruction, source) => __awaiter(this, void 0, void 0, function* () {
        return yield transaction_1.Transaction.sendInstructions([source], [instruction]);
    });
})(Memo = exports.Memo || (exports.Memo = {}));
