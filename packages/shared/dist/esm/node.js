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
    Node.options = {
        clusterUrl: '',
        commitment: Constants.COMMITMENT,
    };
    Node.getConnection = () => {
        debugLog(`# [Before] cluster:${Node.options.clusterUrl}, commitment:${Node.options.commitment}`);
        // default setting
        if (!Node.options.clusterUrl) {
            Node.options.clusterUrl = Constants.switchCluster({ cluster: Constants.currentCluster });
        }
        // default setting
        if (!Node.options.commitment) {
            Node.options.commitment = Constants.COMMITMENT;
        }
        debugLog(`# [After] cluster:${Node.options.clusterUrl}, commitment:${Node.options.commitment}`);
        return new Connection(Node.options.clusterUrl, Node.options.commitment);
    };
    Node.changeConnection = (param) => {
        let { cluster, commitment, customClusterUrl } = param;
        if (commitment) {
            Node.options.commitment = commitment;
            debugLog('# Node change commitment: ', Node.options.commitment);
        }
        if (cluster) {
            Node.options.clusterUrl = Constants.switchCluster({ cluster: cluster });
            debugLog('# Node change cluster: ', Node.options.clusterUrl);
        }
        if (customClusterUrl) {
            debugLog('# customClusterUrl: ', customClusterUrl);
            Node.options.clusterUrl = Constants.switchCluster({ customClusterUrl });
            debugLog('# Node change cluster, custom cluster url: ', Node.options.clusterUrl);
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
