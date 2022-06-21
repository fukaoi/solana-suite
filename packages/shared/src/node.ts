import {
  Constants,
  ConstantsFunc,
} from './constants';

import {
  Connection,
  Commitment,
} from '@solana/web3.js';

export namespace Node {
  let cluster: string;
  let commitment: Commitment;
  export const getConnection = (): Connection => {

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

  export const changeConnection = (param: {
    cluster?: string,
    commitment?: Commitment,
  }): void => {
    if (param.commitment) {
      console.debug('# Node change commitment: ', commitment);
      commitment = param.commitment;
    }

    if (param.cluster) {
      console.debug('# Node change cluster: ', cluster);
      cluster = ConstantsFunc.switchApi(param.cluster);
    }
  }
}
