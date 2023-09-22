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
const types_1 = require("../types/");
const signatures_1 = require("../signatures");
const transaction_filter_1 = require("../transaction-filter");
var SplToken;
(function (SplToken) {
    SplToken.getHistory = (target, filterType, onOk, onErr, options = {}) => __awaiter(this, void 0, void 0, function* () {
        try {
            const defaultValues = {
                waitTime: 0.03,
                narrowDown: 100,
            };
            const mergedOptions = Object.assign(Object.assign({}, defaultValues), options);
            if (filterType === types_1.FilterType.Memo) {
                const parser = transaction_filter_1.TransactionFilter.parse(filterType, types_1.ModuleName.SplToken);
                yield signatures_1.Signatures.getForAdress(target, parser, (result) => result.match(onOk, onErr), mergedOptions);
            }
            else {
                const tokenAccounts = yield shared_1.Node.getConnection().getParsedTokenAccountsByOwner(target.toPublicKey(), {
                    programId: spl_token_1.TOKEN_PROGRAM_ID,
                });
                const storedHistories = [];
                (0, shared_1.debugLog)("# tokenAccounts size: ", tokenAccounts.value.length);
                for (const account of tokenAccounts.value) {
                    const parser = transaction_filter_1.TransactionFilter.parse(filterType, types_1.ModuleName.SplToken);
                    yield signatures_1.Signatures.getForAdress(account.pubkey.toString(), parser, (result) => result.match(onOk, onErr), mergedOptions, storedHistories);
                }
            }
        }
        catch (e) {
            if (e instanceof Error) {
                onErr(e);
            }
        }
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=history.js.map