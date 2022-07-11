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
  createNftOperation,
  createNftBuilder,
  CreateNftBuilderParams,
  CreateNftOperation,
  findMetadataPda,
  findMasterEditionV2Pda,
  findAssociatedTokenAccountPda,
  JsonMetadata,
} from "@metaplex-foundation/js";

import * as beet from '@metaplex-foundation/beet';

import {
  DataV2,
  Creator
} from '@metaplex-foundation/mpl-token-metadata';

import {
  Node,
  Instruction,
  Result,
  Constants,
  ConstantsFunc,
} from '@solana-suite/shared';


import {
  getMinimumBalanceForRentExemptMint
} from '@solana/spl-token';

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
    const operation = createNftOperation(input);
    console.log('## mint.operation: ', operation);
    // const tx = createNftBuilder(operation);
    const {nft} = await init(feePayer).nfts().create(input);
    // return nft;
  }

  const resolveData = (
    input: CreateNftInput,
    metadata: JsonMetadata,
    updateAuthority: PublicKey
  ): DataV2 => {
    const metadataCreators: Creator[] | undefined = metadata.properties?.creators
      ?.filter((creator) => creator.address)
      .map((creator) => ({
        address: new PublicKey(creator.address as string),
        share: creator.share ?? 0,
        verified: false,
      }));

    let creators = input.creators ?? metadataCreators ?? null;

    if (creators === null) {
      creators = [
        {
          address: updateAuthority,
          share: 100,
          verified: true,
        },
      ];
    } else {
      creators = creators.map((creator) => {
        if (creator.address.toBase58() === updateAuthority.toBase58()) {
          return {...creator, verified: true};
        } else {
          return creator;
        }
      });
    }

    return {
      name: input.name ?? metadata.name ?? '',
      symbol: input.symbol ?? metadata.symbol ?? '',
      uri: input.uri,
      sellerFeeBasisPoints:
        input.sellerFeeBasisPoints ?? metadata.seller_fee_basis_points ?? 500,
      creators,
      collection: input.collection ?? null,
      uses: input.uses ?? null,
    };
  };


  const createNftOperationHandler = async (
    operation: CreateNftOperation,
    feePayer: Keypair
  ) => {
    const {
      uri,
      isMutable,
      maxSupply,
      mint = Keypair.generate(),
      payer = feePayer,
      mintAuthority = feePayer,
      updateAuthority = mintAuthority,
      owner = mintAuthority.publicKey,
      freezeAuthority,
      tokenProgram,
      associatedTokenProgram,
    } = operation.input;
    let metadata = {};

    try {
      metadata = await init(feePayer).storage().downloadJson(uri);
    } catch (e) {
      metadata = {};
    }

    console.log('## operation.createNftOperationHandler:', operation);
    console.log('---------------------------------------------------------');


    const data = resolveData(operation.input, metadata, updateAuthority.publicKey);
    const metadataPda = findMetadataPda(mint.publicKey);
    const masterEditionPda = findMasterEditionV2Pda(mint.publicKey);
    const lamports = await getMinimumBalanceForRentExemptMint(Node.getConnection());
    const associatedToken = findAssociatedTokenAccountPda(mint.publicKey, owner, tokenProgram, associatedTokenProgram);
    return createNftBuilder({
      lamports,
      data,
      isMutable,
      maxSupply,
      mint,
      payer,
      mintAuthority,
      updateAuthority,
      owner,
      associatedToken,
      freezeAuthority,
      metadata: metadataPda,
      masterEdition: masterEditionPda,
      tokenProgram,
      associatedTokenProgram
    });
  };
}
