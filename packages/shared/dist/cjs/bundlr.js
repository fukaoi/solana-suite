"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bundlr = void 0;
const js_1 = require("@metaplex-foundation/js");
const node_1 = require("./node");
const constants_1 = require("./constants");
var Bundlr;
(function (Bundlr) {
    const BUNDLR_CONNECT_TIMEOUT = 60000;
    Bundlr.make = (feePayer) => {
        const object = js_1.Metaplex.make(node_1.Node.getConnection()).use((0, js_1.bundlrStorage)({
            address: constants_1.Constants.BUNDLR_NETWORK_URL,
            providerUrl: constants_1.Constants.switchCluster({
                cluster: constants_1.Constants.currentCluster,
            }),
            timeout: BUNDLR_CONNECT_TIMEOUT,
        }));
        if (isKeypair(feePayer)) {
            object.use((0, js_1.keypairIdentity)(feePayer));
        }
        else if (isPhantom(feePayer)) {
            object.use((0, js_1.walletAdapterIdentity)(feePayer));
        }
        return object;
    };
    Bundlr.useStorage = (feePayer) => {
        return Bundlr.make(feePayer).storage().driver();
    };
    const isKeypair = (payer) => {
        if (!payer) {
            return false;
        }
        return 'secretKey' in payer;
    };
    const isPhantom = (payer) => {
        if (!payer) {
            return false;
        }
        return 'connect' in payer;
    };
})(Bundlr = exports.Bundlr || (exports.Bundlr = {}));
//# sourceMappingURL=bundlr.js.map