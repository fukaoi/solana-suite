import { debugLog } from './global';
import { Result } from './result';
import { Constants } from './constants';

import {
  Connection,
  Commitment,
  RpcResponseAndContext,
  SignatureResult,
} from '@solana/web3.js';

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
    // customUrls?: string[];
    customUrls?: string;
  }): void => {
    if (param.commitment) {
      options.commitment = param.commitment;
      debugLog('# Node change commitment: ', options.commitment);
    }

    if (param.cluster) {
      if (Constants.Cluster.custom === param.cluster) {
        if (!param.customUrls || param.customUrls?.length < 1) {
          throw Error('if set cluster: custom, please set customUrls');
        }
        options.cluster = Constants.switchCluster(
          param.cluster,
          param.customUrls
        );
        debugLog('# Node change cluster: ', options.cluster);
      } else {
        options.cluster = Constants.switchCluster(param.cluster);
        debugLog('# Node change cluster: ', options.cluster);
      }
    }
  };

  export const confirmedSig = async (
    signature: string,
    commitment: Commitment = Constants.COMMITMENT
  ): Promise<
    Result<RpcResponseAndContext<SignatureResult> | unknown, Error>
  > => {
    /** @deprecated Instead, call `confirmTransaction` using a `TransactionConfirmationConfig` */
    return await Node.getConnection()
      .confirmTransaction(signature, commitment)
      .then(Result.ok)
      .catch(Result.err);
  };
}
