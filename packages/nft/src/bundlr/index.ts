import {
  Metaplex as MetaplexFoundation,
  keypairIdentity,
  bundlrStorage,
  BundlrStorageDriver,
} from '@metaplex-foundation/js';

import { Keypair } from '@solana/web3.js';

import { Node, Constants, ConstantsFunc } from '@solana-suite/shared';

export namespace Bundlr {
  const BUNDLR_CONNECT_TIMEOUT = 60000;

  export const make = (feePayer: Keypair): MetaplexFoundation => {
    return MetaplexFoundation.make(Node.getConnection())
      .use(keypairIdentity(feePayer))
      .use(
        bundlrStorage({
          address: Constants.BUNDLR_NETWORK_URL,
          providerUrl: ConstantsFunc.switchCluster(Constants.currentCluster),
          timeout: BUNDLR_CONNECT_TIMEOUT,
        })
      );
  };

  export const useStorage = (feePayer: Keypair): BundlrStorageDriver => {
    return make(feePayer).storage().driver() as BundlrStorageDriver;
  };
}
