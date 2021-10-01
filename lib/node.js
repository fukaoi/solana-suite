"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const constants_1 = require("./constants");
const web3_js_1 = require("@solana/web3.js");
var Node;
(function (Node) {
    let connection;
    Node.getConnection = () => {
        if (connection)
            return connection;
        connection = new web3_js_1.Connection(constants_1.Constants.API_URL);
        return connection;
    };
    Node.getApiUrl = () => constants_1.Constants.API_URL;
})(Node = exports.Node || (exports.Node = {}));
