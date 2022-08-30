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
exports.SplToken = void 0;
const spl_token_1 = require("@solana/spl-token");
const shared_1 = require("@solana-suite/shared");
var SplToken;
(function (SplToken) {
    SplToken.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        const res = yield shared_1.Node.getConnection()
            .getParsedTokenAccountsByOwner(owner, {
            programId: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (res.isErr) {
            return shared_1.Result.err(Error(res.error));
        }
        const info = res.unwrap().value.reduce((arr, d) => {
            if (d.account.data.parsed.info.tokenAmount.uiAmount > 0) {
                arr.push({
                    owner: owner.toString(),
                    mint: d.account.data.parsed.info.mint,
                    amount: d.account.data.parsed.info.tokenAmount.uiAmount,
                    tokenAccount: d.pubkey.toString(),
                });
            }
            return arr;
        }, []);
        return shared_1.Result.ok(info);
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
