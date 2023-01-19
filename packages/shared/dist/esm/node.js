var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { debugLog } from './global';
import { Result } from './result';
import { Constants } from './constants';
import { Connection } from '@solana/web3.js';
export var Node;
(function (Node) {
    const setted = {
        clusterUrl: '',
        commitment: Constants.COMMITMENT,
        customClusterUrl: [],
    };
    Node.getConnection = () => {
        debugLog('# [Before] setted:', setted);
        debugLog('# [Before] Constants.customClusterUrl:', Constants.customClusterUrl);
        if (setted.customClusterUrl.length > 0) {
            // custom cluster
            setted.clusterUrl = Constants.switchCluster({
                customClusterUrl: setted.customClusterUrl,
            });
        }
        else if (Constants.customClusterUrl.length > 0) {
            // custom cluster by json config
            setted.clusterUrl = Constants.switchCluster({
                customClusterUrl: Constants.customClusterUrl,
            });
        }
        else if (!setted.clusterUrl) {
            // default cluster
            setted.clusterUrl = Constants.switchCluster({
                cluster: Constants.currentCluster,
            });
        }
        if (!setted.commitment) {
            setted.commitment = Constants.COMMITMENT;
        }
        debugLog('# [After] setted:', setted);
        return new Connection(setted.clusterUrl, setted.commitment);
    };
    Node.changeConnection = (param) => {
        // initialize
        setted.clusterUrl = '';
        setted.customClusterUrl = [];
        setted.commitment = Constants.COMMITMENT;
        const { cluster, commitment, customClusterUrl } = param;
        if (commitment) {
            setted.commitment = commitment;
            debugLog('# Node change commitment: ', setted.commitment);
        }
        if (cluster) {
            setted.clusterUrl = Constants.switchCluster({ cluster: cluster });
            debugLog('# Node change clusterUrl: ', setted.clusterUrl);
        }
        if (customClusterUrl) {
            debugLog('# customClusterUrl: ', customClusterUrl);
            setted.clusterUrl = Constants.switchCluster({ customClusterUrl });
            setted.customClusterUrl = customClusterUrl;
            debugLog('# Node change cluster, custom cluster url: ', setted.clusterUrl);
        }
    };
    Node.confirmedSig = (signature, commitment = Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        const connection = Node.getConnection();
        const latestBlockhash = yield connection.getLatestBlockhash();
        return yield connection
            .confirmTransaction({
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            signature,
        }, commitment)
            .then(Result.ok)
            .catch(Result.err);
    });
})(Node || (Node = {}));
//# sourceMappingURL=node.js.map