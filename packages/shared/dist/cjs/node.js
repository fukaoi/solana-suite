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
    let cluster;
    let commitment;
    Node.getConnection = () => {
        // default setting
        if (!cluster) {
            cluster = _1.ConstantsFunc.switchCluster(_1.Constants.currentCluster);
        }
        // default setting
        if (!commitment) {
            commitment = _1.Constants.COMMITMENT;
        }
        (0, _1.debugLog)('# Node info: ', cluster, commitment);
        return new web3_js_1.Connection(cluster, commitment);
    };
    Node.changeConnection = (param) => {
        if (param.commitment) {
            (0, _1.debugLog)('# Node change commitment: ', commitment);
            commitment = param.commitment;
        }
        if (param.cluster) {
            (0, _1.debugLog)('# Node change cluster: ', cluster);
            cluster = _1.ConstantsFunc.switchCluster(param.cluster);
        }
    };
    Node.confirmedSig = (signature, commitment = _1.Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        /** @deprecated Instead, call `confirmTransaction` using a `TransactionConfirmationConfig` */
        return yield Node.getConnection().confirmTransaction(signature, commitment)
            .then(_1.Result.ok)
            .catch(_1.Result.err);
    });
})(Node = exports.Node || (exports.Node = {}));
