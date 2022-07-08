import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  Signer,
  Keypair,
} from '@solana/web3.js';

import {
  Metaplex as MetaplexFoundation,
  keypairIdentity,
  bundlrStorage,
  CreateNftInput,
} from "@metaplex-foundation/js";

import {
  Node,
  Instruction,
  Result,
  Constants,
  ConstantsFunc,
} from '@solana-suite/shared';

export namespace Metaplex {
  const BUNDLR_CONNECT_TIMEOUT = 60000;

  export const init = (feePayer: Keypair) => {
    return MetaplexFoundation
      .make(Node.getConnection())
      .use(keypairIdentity(feePayer))
      .use(bundlrStorage({
        address: Constants.BUNDLR_NETWORK_URL,
        providerUrl: ConstantsFunc.switchCluster(Constants.currentCluster),
        timeout: BUNDLR_CONNECT_TIMEOUT,
      }));
  }

  export const mint = async(
    input: CreateNftInput,
    feePayer: Keypair,
  ) => {
    const {nft} = await init(feePayer).nfts().create(input);
  }

  export const update = () => {

  }
}
