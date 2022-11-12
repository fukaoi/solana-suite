"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantsFunc = void 0;
const constants_1 = require("../constants");
var ConstantsFunc;
(function (ConstantsFunc) {
    ConstantsFunc.switchBundlr = (env) => {
        switch (env) {
            case constants_1.Constants.Cluster.dev:
            case constants_1.Constants.Cluster.test:
            case constants_1.Constants.Cluster.localhost:
                return 'https://devnet.bundlr.network';
            default: {
                const index = Date.now() % 2;
                const clusters = [
                    'https://node1.bundlr.network',
                    'https://node2.bundlr.network',
                ];
                return clusters[index];
            }
        }
    };
})(ConstantsFunc = exports.ConstantsFunc || (exports.ConstantsFunc = {}));
