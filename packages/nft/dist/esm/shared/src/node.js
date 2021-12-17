import { Constants } from './constants';
import { Connection, } from '@solana/web3.js';
export var Node;
(function (Node) {
    let connection;
    Node.getConnection = () => {
        if (connection)
            return connection;
        connection = new Connection(Constants.API_URL, Constants.COMMITMENT);
        return connection;
    };
    Node.getApiUrl = () => Constants.API_URL;
})(Node || (Node = {}));
