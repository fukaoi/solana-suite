import {
  Metaplex as MetaplexFoundation,
  keypairIdentity,
  bundlrStorage,
  BundlrStorageDriver,
} from "@metaplex-foundation/js";

import { Keypair } from "@solana/web3.js";

import { Node, Constants, ConstantsFunc } from "@solana-suite/shared";

export namespace Bundlr {
  const BUNDLR_CONNECT_TIMEOUT = 60000;

  export const driver = (feePayer: Keypair): BundlrStorageDriver => {
    const foundation = MetaplexFoundation.make(Node.getConnection())
      .use(keypairIdentity(feePayer))
      .use(
        bundlrStorage({
          address: Constants.BUNDLR_NETWORK_URL,
          providerUrl: ConstantsFunc.switchCluster(Constants.currentCluster),
          timeout: BUNDLR_CONNECT_TIMEOUT,
        })
      );
    return foundation.storage().driver() as BundlrStorageDriver;
  };
}
