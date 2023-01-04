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
    const setted = {
        clusterUrl: '',
        commitment: constants_1.Constants.COMMITMENT,
        customClusterUrl: [''],
    };
    Node.getConnection = () => {
        (0, global_1.debugLog)('# [Before] setted:', setted);
        (0, global_1.debugLog)('# [Before] Constants.customClusterUrl:', constants_1.Constants.customClusterUrl);
        if (setted.customClusterUrl.values.length > 1) {
            // custom cluster
            setted.clusterUrl = constants_1.Constants.switchCluster({
                customClusterUrl: setted.customClusterUrl,
            });
        }
        else if (constants_1.Constants.customClusterUrl.values.length > 1) {
            // custom cluster by json config
            setted.clusterUrl = constants_1.Constants.switchCluster({
                customClusterUrl: constants_1.Constants.customClusterUrl,
            });
        }
        else if (!setted.clusterUrl) {
            // default cluster
            setted.clusterUrl = constants_1.Constants.switchCluster({
                cluster: constants_1.Constants.currentCluster,
            });
        }
        if (!setted.commitment) {
            setted.commitment = constants_1.Constants.COMMITMENT;
        }
        (0, global_1.debugLog)('# [After] setted:', setted);
        return new web3_js_1.Connection(setted.clusterUrl, setted.commitment);
    };
    Node.changeConnection = (param) => {
        // initialize
        setted.clusterUrl = '';
        setted.customClusterUrl = [''];
        setted.commitment = constants_1.Constants.COMMITMENT;
        let { cluster, commitment, customClusterUrl } = param;
        if (commitment) {
            setted.commitment = commitment;
            (0, global_1.debugLog)('# Node change commitment: ', setted.commitment);
        }
        if (cluster) {
            setted.clusterUrl = constants_1.Constants.switchCluster({ cluster: cluster });
            (0, global_1.debugLog)('# Node change clusterUrl: ', setted.clusterUrl);
        }
        if (customClusterUrl) {
            (0, global_1.debugLog)('# customClusterUrl: ', customClusterUrl);
            setted.clusterUrl = constants_1.Constants.switchCluster({ customClusterUrl });
            setted.customClusterUrl = customClusterUrl;
            (0, global_1.debugLog)('# Node change cluster, custom cluster url: ', setted.clusterUrl);
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
//# sourceMappingURL=node.js.map