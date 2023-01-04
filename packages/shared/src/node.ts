import { debugLog } from './global';
import { Result } from './result';
import { Constants } from './constants';

import { Connection, Commitment } from '@solana/web3.js';

export namespace Node {
  export const options = {
    clusterUrl: '',
    commitment: Constants.COMMITMENT,
  };

  export const getConnection = (): Connection => {
    debugLog(
      `# [Before] cluster:${options.clusterUrl}, commitment:${options.commitment}`
    );

    // default setting
    if (!options.clusterUrl || Constants.isCustomCluster) {
      options.clusterUrl = Constants.switchCluster({cluster: Constants.currentCluster});
    }

    // default setting
    if (!options.commitment) {
      options.commitment = Constants.COMMITMENT;
    }

    debugLog(
      `# [After] cluster:${options.clusterUrl}, commitment:${options.commitment}`
    );

    return new Connection(options.clusterUrl, options.commitment);
  };

  export const changeConnection = (param: {
    cluster?: string;
    commitment?: Commitment;
    customClusterUrl?: string[];
  }): void => {
    let { cluster, commitment, customClusterUrl } = param;
    if (commitment) {
      options.commitment = commitment;
      debugLog('# Node change commitment: ', options.commitment);
    }

    if (cluster) {
      options.clusterUrl = Constants.switchCluster({ cluster: cluster });
      debugLog('# Node change cluster: ', options.clusterUrl);
    }

    if (customClusterUrl) {
      debugLog('# customClusterUrl: ', customClusterUrl);
      options.clusterUrl = Constants.switchCluster({ customClusterUrl });
      debugLog('# Node change cluster, custom cluster url: ', options.clusterUrl);
    }
  };

  export const confirmedSig = async (
    signature: string,
    commitment: Commitment = Constants.COMMITMENT
  ) => {
    const connection = Node.getConnection();
    const latestBlockhash = await connection.getLatestBlockhash();
    return await connection
      .confirmTransaction(
        {
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
          signature,
        },
        commitment
      )
      .then(Result.ok)
      .catch(Result.err);
  };
}
