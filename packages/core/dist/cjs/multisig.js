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
const _multisig_1 = require("./internals/_multisig");
var Multisig;
(function (Multisig) {
    Multisig.isAddress = (multisig) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const info = yield Multisig.getMultisigInfo(multisig);
            if (info.isErr) {
                return false;
            }
            return true;
        }));
    });
    Multisig.getMultisigInfo = (multisig) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const info = yield shared_1.Node.getConnection().getAccountInfo(multisig);
            if (info === null) {
                throw Error('Failed to find multisig');
            }
            if (!info.owner.equals(spl_token_1.TOKEN_PROGRAM_ID)) {
                throw Error('Invalid multisig owner');
            }
            if (info.data.length !== _multisig_1.Internals_Multisig.Layout.span) {
                throw Error('Invalid multisig size');
            }
            const data = Buffer.from(info.data);
            const multisigInfo = _multisig_1.Internals_Multisig.Layout.decode(data);
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
    Multisig.create = (m, feePayer, signerPubkey) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            if (m > signerPubkey.length) {
                throw Error('signers number less than m number');
            }
            const account = web3_js_1.Keypair.generate();
            const connection = shared_1.Node.getConnection();
            const balanceNeeded = yield connection.getMinimumBalanceForRentExemption(_multisig_1.Internals_Multisig.Layout.span);
            const inst1 = _multisig_1.Internals_Multisig.account(account, feePayer, balanceNeeded);
            const inst2 = _multisig_1.Internals_Multisig.multisig(m, account, signerPubkey);
            return new shared_1.Instruction([inst1, inst2], [account], feePayer, account.publicKey.toBase58());
        }));
    });
})(Multisig = exports.Multisig || (exports.Multisig = {}));
