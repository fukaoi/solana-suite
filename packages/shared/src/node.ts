import { debugLog } from './global';
import { Result } from './result';
import { Constants } from './constants';

import { Connection, Commitment } from '@solana/web3.js';

export namespace Node {
  export const options = {
    cluster: '',
    commitment: Constants.COMMITMENT,
  };

  export const getConnection = (): Connection => {
    debugLog(
      `# [Before] cluster:${options.cluster}, commitment:${options.commitment}`
    );

    // default setting
    if (!options.cluster) {
      options.cluster = Constants.switchCluster(Constants.currentCluster);
    }

    // default setting
    if (!options.commitment) {
      options.commitment = Constants.COMMITMENT;
    }

    debugLog(
      `# [After] cluster:${options.cluster}, commitment:${options.commitment}`
    );

    return new Connection(options.cluster, options.commitment);
  };

  export const changeConnection = (param: {
    cluster?: string;
    commitment?: Commitment;
    customClusterUrl?: string[];
  }): void => {
    if (param.commitment) {
      options.commitment = param.commitment;
      debugLog('# Node change commitment: ', options.commitment);
    }

    if (param.cluster) {
      options.cluster = Constants.switchCluster(param.cluster);
      debugLog('# Node change cluster: ', options.cluster);
    }

    if (param.customClusterUrl) {
      debugLog('# customClusterUrl: ', param.customClusterUrl);
      options.cluster = Constants.switchCluster(
        undefined,
        param.customClusterUrl
      );
      debugLog('# Node change cluster, custom cluster url: ', options.cluster);
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
