import {
  debugLog,
  Constants,
  ConstantsFunc,
  Result,
} from './';

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

    // default setting
    if (!cluster) {
      cluster = ConstantsFunc.switchCluster(Constants.currentCluster);
    }

    // default setting
    if (!commitment) {
      commitment = Constants.COMMITMENT;
    }

    debugLog('# Node info: ', cluster, commitment);

    return new Connection(cluster, commitment);
  };

  export const changeConnection = (param: {
    cluster?: string,
    commitment?: Commitment,
  }): void => {
    if (param.commitment) {
      debugLog('# Node change commitment: ', commitment);
      commitment = param.commitment;
    }

    if (param.cluster) {
      debugLog('# Node change cluster: ', cluster);
      cluster = ConstantsFunc.switchCluster(param.cluster);
    }
  }

 export const confirmedSig = async (
    signature: string,
    commitment: Commitment = Constants.COMMITMENT
  ): Promise<Result<RpcResponseAndContext<SignatureResult> | unknown, Error>> => {
    /** @deprecated Instead, call `confirmTransaction` using a `TransactionConfirmationConfig` */
    return await Node.getConnection().confirmTransaction(signature, commitment)
      .then(Result.ok)
      .catch(Result.err);
  }
}
