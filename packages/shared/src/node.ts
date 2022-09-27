import { debugLog, Constants, ConstantsFunc, Result } from './';

import {
  Connection,
  Commitment,
  RpcResponseAndContext,
  SignatureResult,
} from '@solana/web3.js';

export namespace Node {
  let cluster: string;
  let commitment: Commitment;
  export const getConnection = (): Connection => {
    debugLog('# [Before] Node info: ', cluster, commitment);

    // default setting
    if (!cluster) {
      cluster = ConstantsFunc.switchCluster(Constants.currentCluster);
    }

    // default setting
    if (!commitment) {
      commitment = Constants.COMMITMENT;
    }

    debugLog('# [After] Node info: ', cluster, commitment);

    return new Connection(cluster, commitment);
  };

  export const changeConnection = (param: {
    cluster?: Constants.Cluster | string;
    commitment?: Commitment;
  }): void => {
    if (param.commitment) {
      commitment = param.commitment;
      debugLog('# Node change commitment: ', commitment);
    }

    if (param.cluster) {
      cluster = ConstantsFunc.switchCluster(param.cluster);
      debugLog('# Node change cluster: ', cluster);
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
