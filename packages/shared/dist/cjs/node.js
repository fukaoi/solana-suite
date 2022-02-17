"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const constants_1 = require("./constants");
const web3_js_1 = require("@solana/web3.js");
var Node;
(function (Node) {
    Node.getConnection = (cluster = constants_1.Constants.currentCluster, commitment = constants_1.Constants.COMMITMENT) => {
        console.debug('# Current cluster: ', cluster);
        return new web3_js_1.Connection(constants_1.ConstantsFunc.switchApi(cluster), commitment);
    };
})(Node = exports.Node || (exports.Node = {}));
