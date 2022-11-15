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
const global_1 = require("./global");
const result_1 = require("./result");
const constants_1 = require("./constants");
const web3_js_1 = require("@solana/web3.js");
var Node;
(function (Node) {
    Node.options = {
        cluster: '',
        commitment: constants_1.Constants.COMMITMENT,
    };
    Node.getConnection = () => {
        (0, global_1.debugLog)(`# [Before] cluster:${Node.options.cluster}, commitment:${Node.options.commitment}`);
        // default setting
        if (!Node.options.cluster) {
            Node.options.cluster = constants_1.Constants.switchCluster(constants_1.Constants.currentCluster);
        }
        // default setting
        if (!Node.options.commitment) {
            Node.options.commitment = constants_1.Constants.COMMITMENT;
        }
        (0, global_1.debugLog)(`# [After] cluster:${Node.options.cluster}, commitment:${Node.options.commitment}`);
        return new web3_js_1.Connection(Node.options.cluster, Node.options.commitment);
    };
    Node.changeConnection = (param) => {
        if (param.commitment) {
            Node.options.commitment = param.commitment;
            (0, global_1.debugLog)('# Node change commitment: ', Node.options.commitment);
        }
        if (param.cluster) {
            Node.options.cluster = constants_1.Constants.switchCluster(param.cluster);
            (0, global_1.debugLog)('# Node change cluster: ', Node.options.cluster);
        }
    };
    Node.confirmedSig = (signature, commitment = constants_1.Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        /** @deprecated Instead, call `confirmTransaction` using a `TransactionConfirmationConfig` */
        return yield Node.getConnection()
            .confirmTransaction(signature, commitment)
            .then(result_1.Result.ok)
            .catch(result_1.Result.err);
    });
})(Node = exports.Node || (exports.Node = {}));
