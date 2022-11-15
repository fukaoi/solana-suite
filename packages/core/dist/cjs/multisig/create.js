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
exports.Multisig = void 0;
const shared_1 = require("@solana-suite/shared");
const web3_js_1 = require("@solana/web3.js");
const instruction_1 = require("./instruction");
var Multisig;
(function (Multisig) {
    Multisig.create = (m, feePayer, signerPubkey) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            if (m > signerPubkey.length) {
                throw Error('signers number less than m number');
            }
            const account = web3_js_1.Keypair.generate();
            const connection = shared_1.Node.getConnection();
            const balanceNeeded = yield connection.getMinimumBalanceForRentExemption(instruction_1.Multisig.Layout.span);
            const inst1 = instruction_1.Multisig.account(account, feePayer, balanceNeeded);
            const inst2 = instruction_1.Multisig.multisig(m, account, signerPubkey);
            return new shared_1.Instruction([inst1, inst2], [account], feePayer, account.publicKey.toBase58());
        }));
    });
})(Multisig = exports.Multisig || (exports.Multisig = {}));
