import { debugLog } from './global';
import { Result } from './result';
import { Constants } from './constants';

import { Connection, Commitment } from '@solana/web3.js';

export namespace Node {
  const setted = {
    clusterUrl: '',
    commitment: Constants.COMMITMENT,
    customClusterUrl: [] as string[],
  };

  export const getConnection = (): Connection => {
    debugLog('# [Before] setted:', setted);
    debugLog(
      '# [Before] Constants.customClusterUrl:',
      Constants.customClusterUrl
    );

    if (setted.customClusterUrl.length > 0) {
      // custom cluster
      setted.clusterUrl = Constants.switchCluster({
        customClusterUrl: setted.customClusterUrl,
      });
    } else if (Constants.customClusterUrl.length > 0) {
      // custom cluster by json config
      setted.clusterUrl = Constants.switchCluster({
        customClusterUrl: Constants.customClusterUrl,
      });
    } else if (!setted.clusterUrl) {
      // default cluster
      setted.clusterUrl = Constants.switchCluster({
        cluster: Constants.currentCluster,
      });
    }

    if (!setted.commitment) {
      setted.commitment = Constants.COMMITMENT;
    }

    debugLog('# [After] setted:', setted);

    return new Connection(setted.clusterUrl, setted.commitment);
  };

  export const changeConnection = (param: {
    cluster?: string;
    commitment?: Commitment;
    customClusterUrl?: string[];
  }): void => {
    // initialize
    setted.clusterUrl = '';
    setted.customClusterUrl = [];
    setted.commitment = Constants.COMMITMENT;

    const { cluster, commitment, customClusterUrl } = param;
    if (commitment) {
      setted.commitment = commitment;
      debugLog('# Node change commitment: ', setted.commitment);
    }

    if (cluster) {
      setted.clusterUrl = Constants.switchCluster({ cluster: cluster });
      debugLog('# Node change clusterUrl: ', setted.clusterUrl);
    }

    if (customClusterUrl) {
      debugLog('# customClusterUrl: ', customClusterUrl);
      setted.clusterUrl = Constants.switchCluster({ customClusterUrl });
      setted.customClusterUrl = customClusterUrl;
      debugLog(
        '# Node change cluster, custom cluster url: ',
        setted.clusterUrl
      );
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
