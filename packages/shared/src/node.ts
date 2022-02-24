import {
  Constants,
  ConstantsFunc,
} from './constants';

import {
  Connection,
  Commitment,
} from '@solana/web3.js';

export namespace Node {
  let connection: Connection | undefined;
  export const getConnection = (): Connection => {
    console.debug('# Current cluster: ', Constants.currentCluster);
    if (connection) {
      return connection;
    }
    connection = new Connection(
      ConstantsFunc.switchApi(Constants.currentCluster),
      Constants.COMMITMENT
    );
    return connection;
  };

  export const changeConnection = (param: {
    cluster?: string,
    commitment?: Commitment,
  }): void => {
    // reset for initialize
    connection = undefined;
    if (param.commitment) {
      connection = new Connection(ConstantsFunc.switchApi(param.cluster), param.commitment);
    } else {
      connection = new Connection(ConstantsFunc.switchApi(param.cluster), Constants.COMMITMENT);
    }
  }
}
