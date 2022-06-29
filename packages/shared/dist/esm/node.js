import { Constants, ConstantsFunc, } from './constants';
import { Connection, } from '@solana/web3.js';
export var Node;
(function (Node) {
    let cluster;
    let commitment;
    Node.getConnection = () => {
        // default setting
        if (!cluster) {
            cluster = ConstantsFunc.switchCluster(Constants.currentCluster);
        }
        // default setting
        if (!commitment) {
            commitment = Constants.COMMITMENT;
        }
        console.debug('# Node info: ', cluster, commitment);
        return new Connection(cluster, commitment);
    };
    Node.changeConnection = (param) => {
        if (param.commitment) {
            console.debug('# Node change commitment: ', commitment);
            commitment = param.commitment;
        }
        if (param.cluster) {
            console.debug('# Node change cluster: ', cluster);
            cluster = ConstantsFunc.switchCluster(param.cluster);
        }
    };
})(Node || (Node = {}));
