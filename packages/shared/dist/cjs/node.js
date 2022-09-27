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
exports.Node = void 0;
const _1 = require("./");
const web3_js_1 = require("@solana/web3.js");
var Node;
(function (Node) {
    const options = {
        cluster: '',
        commitment: _1.Constants.COMMITMENT,
    };
    Node.getConnection = () => {
        (0, _1.debugLog)('# [Before] Node info: ', options.cluster, options.commitment);
        // default setting
        if (!options.cluster) {
            options.cluster = _1.ConstantsFunc.switchCluster(_1.Constants.currentCluster);
        }
        // default setting
        if (!options.commitment) {
            options.commitment = _1.Constants.COMMITMENT;
        }
        (0, _1.debugLog)('# [After] Node info: ', options.cluster, options.commitment);
        return new web3_js_1.Connection(options.cluster, options.commitment);
    };
    Node.changeConnection = (param) => {
        if (param.commitment) {
            options.commitment = param.commitment;
            (0, _1.debugLog)('# Node change commitment: ', options.commitment);
        }
        if (param.cluster) {
            options.cluster = _1.ConstantsFunc.switchCluster(param.cluster);
            (0, _1.debugLog)('# Node change cluster: ', options.cluster);
        }
    };
    Node.confirmedSig = (signature, commitment = _1.Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        /** @deprecated Instead, call `confirmTransaction` using a `TransactionConfirmationConfig` */
        return yield Node.getConnection()
            .confirmTransaction(signature, commitment)
            .then(_1.Result.ok)
            .catch(_1.Result.err);
    });
})(Node = exports.Node || (exports.Node = {}));
