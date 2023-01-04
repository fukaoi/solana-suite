var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, Try } from '@solana-suite/shared';
import { SolNative as _Is } from './is-parsed-instruction';
export var SolNative;
(function (SolNative) {
    SolNative.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const res = yield Node.getConnection().getParsedAccountInfo(owner);
            const info = {
                sol: 0,
                lamports: 0,
                owner: owner.toString(),
            };
            if (_Is.isParsedInstruction((_a = res.value) === null || _a === void 0 ? void 0 : _a.data)) {
                const parsedAccountData = (_b = res.value) === null || _b === void 0 ? void 0 : _b.data;
                info.owner = (_d = (_c = parsedAccountData.parsed) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.owner;
            }
            if (res.value) {
                info.lamports = (_e = res.value) === null || _e === void 0 ? void 0 : _e.lamports;
                info.sol = (_f = res.value) === null || _f === void 0 ? void 0 : _f.lamports.toSol();
            }
            return info;
        }));
    });
})(SolNative || (SolNative = {}));
//# sourceMappingURL=find.js.map