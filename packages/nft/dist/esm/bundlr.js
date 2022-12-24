import { Metaplex as MetaplexFoundation, keypairIdentity, bundlrStorage, walletAdapterIdentity, } from '@metaplex-foundation/js';
import { Node, Constants } from '@solana-suite/shared';
export var Bundlr;
(function (Bundlr) {
    const BUNDLR_CONNECT_TIMEOUT = 60000;
    Bundlr.make = (feePayer) => {
        const object = MetaplexFoundation.make(Node.getConnection()).use(bundlrStorage({
            address: Constants.BUNDLR_NETWORK_URL,
            providerUrl: Constants.switchCluster({
                cluster: Constants.currentCluster,
            }),
            timeout: BUNDLR_CONNECT_TIMEOUT,
        }));
        if (isKeypair(feePayer)) {
            object.use(keypairIdentity(feePayer));
        }
        else if (isPhantom(feePayer)) {
            object.use(walletAdapterIdentity(feePayer));
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
})(Bundlr || (Bundlr = {}));
