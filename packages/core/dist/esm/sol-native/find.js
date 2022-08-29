var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Node, Result } from '@solana-suite/shared';
export var SolNative;
(function (SolNative) {
    SolNative.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const accountInfo = yield Node.getConnection()
            .getParsedAccountInfo(owner)
            .then(Result.ok)
            .catch(Result.err);
        if (accountInfo.isErr) {
            return Result.err(accountInfo.error);
        }
        const info = {
            sol: 0,
            lamports: 0,
            owner: owner.toString(),
        };
        if (accountInfo.value.value) {
            info.lamports = (_a = accountInfo.value.value) === null || _a === void 0 ? void 0 : _a.lamports;
            info.sol = ((_b = accountInfo.value.value) === null || _b === void 0 ? void 0 : _b.lamports) / LAMPORTS_PER_SOL;
        }
        return Result.ok(info);
    });
})(SolNative || (SolNative = {}));
