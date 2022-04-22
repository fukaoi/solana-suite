import { Constants, ConstantsFunc, } from './constants';
import { Connection, } from '@solana/web3.js';
export var Node;
(function (Node) {
    let cluster;
    let commitment;
    Node.getConnection = () => {
        // default setting
        if (!cluster) {
            cluster = ConstantsFunc.switchApi(Constants.currentCluster);
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
            commitment = param.commitment;
        }
        if (param.cluster) {
            cluster = ConstantsFunc.switchApi(param.cluster);
        }
    };
})(Node || (Node = {}));
