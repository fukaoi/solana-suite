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
exports.SolNative = void 0;
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
const _index_1 = require("../internals/_index");
var SolNative;
(function (SolNative) {
    SolNative.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const res = yield shared_1.Node.getConnection()
            .getParsedAccountInfo(owner)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (res.isErr) {
            return shared_1.Result.err(res.error);
        }
        const info = {
            sol: 0,
            lamports: 0,
            owner: owner.toString(),
        };
        if (_index_1.Internals.isParsedInstruction((_a = res.unwrap().value) === null || _a === void 0 ? void 0 : _a.data)) {
            info.owner = ((_b = res.value.value) === null || _b === void 0 ? void 0 : _b.data).parsed.info.owner;
        }
        if (res.value.value) {
            info.lamports = (_c = res.value.value) === null || _c === void 0 ? void 0 : _c.lamports;
            info.sol = ((_d = res.value.value) === null || _d === void 0 ? void 0 : _d.lamports) / web3_js_1.LAMPORTS_PER_SOL;
        }
        return shared_1.Result.ok(info);
    });
})(SolNative = exports.SolNative || (exports.SolNative = {}));
