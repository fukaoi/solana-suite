"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memo = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const _1 = require("./");
var Memo;
(function (Memo) {
    Memo.decode = (encoded) => bs58_1.default.decode(encoded).toString();
    Memo.encode = (data) => Buffer.from(data);
    Memo.create = (data, owners, signers, feePayer) => {
        const key = owners && owners.length > 0
            ?
                owners.map(owner => {
                    return {
                        pubkey: owner,
                        isSigner: true,
                        isWritable: true
                    };
                })
            : [];
        const instruction = new web3_js_1.TransactionInstruction({
            programId: _1.Constants.MEMO_PROGRAM_ID,
            data: Memo.encode(data),
            keys: key
        });
        return new _1.Instruction([instruction], signers, feePayer);
    };
    Memo.parse = (tx) => {
        const res = tx.transaction.message.instructions.filter(d => {
            const value = d;
            return value.program === 'spl-memo';
        });
        return res[0].parsed;
    };
})(Memo = exports.Memo || (exports.Memo = {}));
//# sourceMappingURL=memo.js.map