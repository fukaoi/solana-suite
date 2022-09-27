import { debugLog, Constants, ConstantsFunc, Result } from './';

import {
  Connection,
  Commitment,
  RpcResponseAndContext,
  SignatureResult,
} from '@solana/web3.js';

export namespace Node {
  const options = {
    cluster: '',
    commitment: Constants.COMMITMENT,
  };
  export const getConnection = (): Connection => {
    debugLog('# [Before] Node info: ', options.cluster, options.commitment);

    // default setting
    if (!options.cluster) {
      options.cluster = ConstantsFunc.switchCluster(Constants.currentCluster);
    }

    // default setting
    if (!options.commitment) {
      options.commitment = Constants.COMMITMENT;
    }

    debugLog('# [After] Node info: ', options.cluster, options.commitment);

    return new Connection(options.cluster, options.commitment);
  };

  export const changeConnection = (param: {
    cluster?: Constants.Cluster | string;
    commitment?: Commitment;
  }): void => {
    if (param.commitment) {
      options.commitment = param.commitment;
      debugLog('# Node change commitment: ', options.commitment);
    }

    if (param.cluster) {
      options.cluster = ConstantsFunc.switchCluster(param.cluster);
      debugLog('# Node change cluster: ', options.cluster);
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
