import { Constants, ConstantsFunc, } from './constants';
import { Connection, } from '@solana/web3.js';
export var Node;
(function (Node) {
    Node.getConnection = (network = Constants.currentNetwork, commitment = Constants.COMMITMENT) => {
        console.debug('# Current network: ', network);
        return new Connection(ConstantsFunc.switchApi(network), commitment);
    };
})(Node || (Node = {}));
