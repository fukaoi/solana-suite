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
exports.MetaplexAccount = void 0;
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
var MetaplexAccount;
(function (MetaplexAccount) {
    MetaplexAccount.findMetaplexAssocaiatedTokenAddress = (tokenKey) => __awaiter(this, void 0, void 0, function* () {
        return yield web3_js_1.PublicKey.findProgramAddress([
            Buffer.from('metadata'),
            shared_1.Constants.METAPLEX_PROGRAM_ID.toBuffer(),
            tokenKey.toBuffer(),
        ], shared_1.Constants.METAPLEX_PROGRAM_ID)
            .then(v => shared_1.Result.ok(v[0]))
            .catch((e) => shared_1.Result.err(e));
    });
})(MetaplexAccount = exports.MetaplexAccount || (exports.MetaplexAccount = {}));
