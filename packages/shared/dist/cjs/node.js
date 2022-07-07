"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const constants_1 = require("./constants");
const global_1 = require("./global");
const web3_js_1 = require("@solana/web3.js");
var Node;
(function (Node) {
    let cluster;
    let commitment;
    Node.getConnection = () => {
        // default setting
        if (!cluster) {
            cluster = constants_1.ConstantsFunc.switchCluster(constants_1.Constants.currentCluster);
        }
        // default setting
        if (!commitment) {
            commitment = constants_1.Constants.COMMITMENT;
        }
        (0, global_1.debugLog)('# Node info: ', cluster, commitment);
        return new web3_js_1.Connection(cluster, commitment);
    };
    Node.changeConnection = (param) => {
        if (param.commitment) {
            (0, global_1.debugLog)('# Node change commitment: ', commitment);
            commitment = param.commitment;
        }
        if (param.cluster) {
            (0, global_1.debugLog)('# Node change cluster: ', cluster);
            cluster = constants_1.ConstantsFunc.switchCluster(param.cluster);
        }
    };
})(Node = exports.Node || (exports.Node = {}));
