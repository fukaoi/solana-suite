import {
  Constants,
  ConstantsFunc,
} from './constants';

import {
  Connection,
} from '@solana/web3.js';

export namespace Node {
  export const getConnection = (
    cluster = Constants.currentCluster,
    commitment = Constants.COMMITMENT
  ): Connection => {
    console.debug('# Current cluster: ', cluster);
    return new Connection(ConstantsFunc.switchApi(cluster), commitment);
  };
}
