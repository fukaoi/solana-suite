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
const spl_token_1 = require("@solana/spl-token");
const instruction_1 = require("./instruction");
var Multisig;
(function (Multisig) {
    Multisig.getInfo = (multisig) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const info = yield shared_1.Node.getConnection().getAccountInfo(multisig);
            if (info === null) {
                throw Error('Failed to find multisig');
            }
            if (!info.owner.equals(spl_token_1.TOKEN_PROGRAM_ID)) {
                throw Error('Invalid multisig owner');
            }
            if (info.data.length !== instruction_1.Multisig.Layout.span) {
                throw Error('Invalid multisig size');
            }
            const data = Buffer.from(info.data);
            const multisigInfo = instruction_1.Multisig.Layout.decode(data);
            multisigInfo.signer1 = new web3_js_1.PublicKey(multisigInfo.signer1);
            multisigInfo.signer2 = new web3_js_1.PublicKey(multisigInfo.signer2);
            multisigInfo.signer3 = new web3_js_1.PublicKey(multisigInfo.signer3);
            multisigInfo.signer4 = new web3_js_1.PublicKey(multisigInfo.signer4);
            multisigInfo.signer5 = new web3_js_1.PublicKey(multisigInfo.signer5);
            multisigInfo.signer6 = new web3_js_1.PublicKey(multisigInfo.signer6);
            multisigInfo.signer7 = new web3_js_1.PublicKey(multisigInfo.signer7);
            multisigInfo.signer8 = new web3_js_1.PublicKey(multisigInfo.signer8);
            multisigInfo.signer9 = new web3_js_1.PublicKey(multisigInfo.signer9);
            multisigInfo.signer10 = new web3_js_1.PublicKey(multisigInfo.signer10);
            multisigInfo.signer11 = new web3_js_1.PublicKey(multisigInfo.signer11);
            return multisigInfo;
        }));
    });
})(Multisig = exports.Multisig || (exports.Multisig = {}));
