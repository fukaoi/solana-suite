import {
  Metaplex as MetaplexFoundation,
  keypairIdentity,
  bundlrStorage,
  BundlrStorageDriver,
  walletAdapterIdentity,
} from '@metaplex-foundation/js';

import { Keypair } from '@solana/web3.js';

import { Node, Constants, ConstantsFunc } from '@solana-suite/shared';

import { BundlrSigner, Phantom} from './types/bundlr';

export namespace Bundlr {
  const BUNDLR_CONNECT_TIMEOUT = 60000;

  export const make = (feePayer?: BundlrSigner): MetaplexFoundation => {
    const object = MetaplexFoundation.make(Node.getConnection()).use(
      bundlrStorage({
        address: Constants.BUNDLR_NETWORK_URL,
        providerUrl: ConstantsFunc.switchCluster(Constants.currentCluster),
        timeout: BUNDLR_CONNECT_TIMEOUT,
      })
    );
    if (isKeypair(feePayer)) {
      object.use(keypairIdentity(feePayer));
    } else if (isPhantom(feePayer)) {
      object.use(walletAdapterIdentity(feePayer));
    }
    return object;
  };

  export const useStorage = (feePayer: BundlrSigner): BundlrStorageDriver => {
    return make(feePayer).storage().driver() as BundlrStorageDriver;
  };

  const isKeypair = (payer: BundlrSigner): payer is Keypair => {
    if (!payer) {
      return false;
    }
    return 'secretKey' in payer;
  };

  const isPhantom = (payer: BundlrSigner): payer is Phantom => {
    if (!payer) {
      return false;
    }
    return 'connect' in payer;
  };
}
