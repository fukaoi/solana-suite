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
        clusterUrl: '',
        commitment: constants_1.Constants.COMMITMENT,
    };
    Node.getConnection = () => {
        (0, global_1.debugLog)(`# [Before] cluster:${Node.options.clusterUrl}, commitment:${Node.options.commitment}`);
        // default setting
        if (!Node.options.clusterUrl) {
            Node.options.clusterUrl = constants_1.Constants.switchCluster({ cluster: constants_1.Constants.currentCluster });
        }
        // default setting
        if (!Node.options.commitment) {
            Node.options.commitment = constants_1.Constants.COMMITMENT;
        }
        (0, global_1.debugLog)(`# [After] cluster:${Node.options.clusterUrl}, commitment:${Node.options.commitment}`);
        return new web3_js_1.Connection(Node.options.clusterUrl, Node.options.commitment);
    };
    Node.changeConnection = (param) => {
        let { cluster, commitment, customClusterUrl } = param;
        if (commitment) {
            Node.options.commitment = commitment;
            (0, global_1.debugLog)('# Node change commitment: ', Node.options.commitment);
        }
        if (cluster) {
            Node.options.clusterUrl = constants_1.Constants.switchCluster({ cluster: cluster });
            (0, global_1.debugLog)('# Node change cluster: ', Node.options.clusterUrl);
        }
        if (customClusterUrl) {
            (0, global_1.debugLog)('# customClusterUrl: ', customClusterUrl);
            Node.options.clusterUrl = constants_1.Constants.switchCluster({ customClusterUrl });
            (0, global_1.debugLog)('# Node change cluster, custom cluster url: ', Node.options.clusterUrl);
        }
    };
    Node.confirmedSig = (signature, commitment = constants_1.Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        const connection = Node.getConnection();
        const latestBlockhash = yield connection.getLatestBlockhash();
        return yield connection
            .confirmTransaction({
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            signature,
        }, commitment)
            .then(result_1.Result.ok)
            .catch(result_1.Result.err);
    });
})(Node = exports.Node || (exports.Node = {}));
