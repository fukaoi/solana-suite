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
  Task,
  createNftOperation,
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

  export const mint = async (
    input: CreateNftInput,
    feePayer: Keypair,
  ) => {

    // return new Task(async (scope) => {
    //   const operation = createNftOperation(input);
    //   const output = await init(feePayer).operations().execute(operation, scope);
      
    //   scope.throwIfCanceled();
    //   console.log(output);
      // const nft = await init(feePayer).nfts().findByMint(output.mintSigner.publicKey).run(scope);
      // return {...output, nft};
    // });

    const {nft} = await init(feePayer).nfts().create(input);
    return nft;
  }

  export const update = () => {

  }
}
