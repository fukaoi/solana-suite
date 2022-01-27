"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const constants_1 = require("./constants");
const web3_js_1 = require("@solana/web3.js");
var Node;
(function (Node) {
    Node.getConnection = (network = constants_1.Constants.currentNetwork, commitment = constants_1.Constants.COMMITMENT) => {
        console.debug('# Current network: ', network);
        return new web3_js_1.Connection(constants_1.ConstantsFunc.switchApi(network), commitment);
    };
})(Node = exports.Node || (exports.Node = {}));
