import {
  Constants,
  ConstantsFunc,
} from './constants';

import {
  Connection,
} from '@solana/web3.js';

export namespace Node {
  export const getConnection = (
    network = Constants.API_URL,
    commitment = Constants.COMMITMENT
  ): Connection => {
    return new Connection(ConstantsFunc.switchApi(network), commitment);
  };
}
