import { Metaplex as MetaplexFoundation, keypairIdentity, bundlrStorage, } from '@metaplex-foundation/js';
import { Node, Constants, ConstantsFunc } from '@solana-suite/shared';
export var Bundlr;
(function (Bundlr) {
    const BUNDLR_CONNECT_TIMEOUT = 60000;
    Bundlr.make = (feePayer) => {
        const object = MetaplexFoundation.make(Node.getConnection()).use(bundlrStorage({
            address: Constants.BUNDLR_NETWORK_URL,
            providerUrl: ConstantsFunc.switchCluster(Constants.currentCluster),
            timeout: BUNDLR_CONNECT_TIMEOUT,
        }));
        if (feePayer) {
            object.use(keypairIdentity(feePayer));
        }
        return object;
    };
    Bundlr.useStorage = (feePayer) => {
        return Bundlr.make(feePayer).storage().driver();
    };
})(Bundlr || (Bundlr = {}));
