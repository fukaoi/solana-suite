import {
  Constants,
  ConstantsFunc,
} from './constants';

import {
  Connection,
} from '@solana/web3.js';

export namespace Node {
  export const getConnection = (
    network = Constants.currentNetwork,
    commitment = Constants.COMMITMENT
  ): Connection => {
    console.debug('# Current network: ', network);
    return new Connection(ConstantsFunc.switchApi(network), commitment);
  };
}
