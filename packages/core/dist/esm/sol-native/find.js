var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LAMPORTS_PER_SOL, } from '@solana/web3.js';
import { Node, Result } from '@solana-suite/shared';
import { Internals } from '../internals/_index';
export var SolNative;
(function (SolNative) {
    SolNative.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const res = yield Node.getConnection()
            .getParsedAccountInfo(owner)
            .then(Result.ok)
            .catch(Result.err);
        if (res.isErr) {
            return Result.err(res.error);
        }
        const info = {
            sol: 0,
            lamports: 0,
            owner: owner.toString(),
        };
        if (Internals.isParsedInstruction((_a = res.unwrap().value) === null || _a === void 0 ? void 0 : _a.data)) {
            info.owner = ((_b = res.value.value) === null || _b === void 0 ? void 0 : _b.data).parsed.info.owner;
        }
        if (res.value.value) {
            info.lamports = (_c = res.value.value) === null || _c === void 0 ? void 0 : _c.lamports;
            info.sol = ((_d = res.value.value) === null || _d === void 0 ? void 0 : _d.lamports) / LAMPORTS_PER_SOL;
        }
        return Result.ok(info);
    });
})(SolNative || (SolNative = {}));
