import { Constants, ConstantsFunc, } from './constants';
import { Connection, } from '@solana/web3.js';
export var Node;
(function (Node) {
    let connection;
    Node.getConnection = () => {
        console.debug('# Current cluster: ', Constants.currentCluster);
        if (connection) {
            return connection;
        }
        connection = new Connection(ConstantsFunc.switchApi(Constants.currentCluster), Constants.COMMITMENT);
        return connection;
    };
    Node.changeConnection = (param) => {
        // reset for initialize
        connection = undefined;
        if (param.commitment) {
            connection = new Connection(ConstantsFunc.switchApi(param.cluster), param.commitment);
        }
        else {
            connection = new Connection(ConstantsFunc.switchApi(param.cluster));
        }
    };
})(Node || (Node = {}));
