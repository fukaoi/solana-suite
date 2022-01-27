import {
  Constants,
  ConstantsFunc
} from './constants';

import {
  Connection,
} from '@solana/web3.js';

export namespace Node {
  export const getConnection = (
    network = Constants.API_URL,
    commitment = Constants.COMMITMENT
  ): Connection => {
    let connection: Connection;
    if (network) {
      connection = new Connection(ConstantsFunc.switchApi(network), commitment);
    } else {
      connection = new Connection(Constants.API_URL, commitment);
    }
    return connection;
  };
}
