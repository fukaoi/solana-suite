import { Constants, ConstantsFunc, } from './constants';
import { Connection, } from '@solana/web3.js';
export var Node;
(function (Node) {
    Node.getConnection = (cluster = Constants.currentCluster, commitment = Constants.COMMITMENT) => {
        console.debug('# Current cluster: ', cluster);
        return new Connection(ConstantsFunc.switchApi(cluster), commitment);
    };
})(Node || (Node = {}));
