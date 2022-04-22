"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const constants_1 = require("./constants");
const web3_js_1 = require("@solana/web3.js");
var Node;
(function (Node) {
    let connection;
    Node.getConnection = () => {
        console.debug('# Current cluster: ', constants_1.Constants.currentCluster, constants_1.ConstantsFunc.switchApi(constants_1.Constants.currentCluster));
        if (connection) {
            return connection;
        }
        connection = new web3_js_1.Connection(constants_1.ConstantsFunc.switchApi(constants_1.Constants.currentCluster), constants_1.Constants.COMMITMENT);
        return connection;
    };
    Node.changeConnection = (param) => {
        // reset for initialize
        connection = undefined;
        if (param.commitment) {
            connection = new web3_js_1.Connection(constants_1.ConstantsFunc.switchApi(param.cluster), param.commitment);
        }
        else {
            connection = new web3_js_1.Connection(constants_1.ConstantsFunc.switchApi(param.cluster), constants_1.Constants.COMMITMENT);
        }
    };
})(Node = exports.Node || (exports.Node = {}));
