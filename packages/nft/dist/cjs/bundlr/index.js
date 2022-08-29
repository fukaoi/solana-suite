"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bundlr = void 0;
const js_1 = require("@metaplex-foundation/js");
const shared_1 = require("@solana-suite/shared");
var Bundlr;
(function (Bundlr) {
    const BUNDLR_CONNECT_TIMEOUT = 60000;
    Bundlr.make = (feePayer) => {
        const object = js_1.Metaplex.make(shared_1.Node.getConnection()).use((0, js_1.bundlrStorage)({
            address: shared_1.Constants.BUNDLR_NETWORK_URL,
            providerUrl: shared_1.ConstantsFunc.switchCluster(shared_1.Constants.currentCluster),
            timeout: BUNDLR_CONNECT_TIMEOUT,
        }));
        if (feePayer) {
            object.use((0, js_1.keypairIdentity)(feePayer));
        }
        return object;
    };
    Bundlr.useStorage = (feePayer) => {
        return Bundlr.make(feePayer).storage().driver();
    };
})(Bundlr = exports.Bundlr || (exports.Bundlr = {}));
