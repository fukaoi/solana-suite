import { PublicKey, Keypair } from '@solana/web3.js';
import { StorageNftStorage, StorageArweave } from '../storage';
import { Instruction, Result, debugLog } from '@solana-suite/shared';
import { Validator, ValidatorError } from '../validator';
import {
  InputMetaplexMetadata,
  MetaplexMetaData,
} from '../types/metaplex/index';
import { Internals_Royalty } from '../internals/_royalty';
import { Bundlr } from '../bundlr';

import { createCreateMasterEditionV3Instruction } from '@metaplex-foundation/mpl-token-metadata';

import {
  findMasterEditionV2Pda,
  CreateNftBuilderParams,
  token,
  TransactionBuilder,
  CreateNftBuilderContext,
} from '@metaplex-foundation/js';
import { BundlrSigner, NftStorageMetadata } from '../types';
import { IdentityClient } from '@metaplex-foundation/js/dist/types/plugins/identityModule';

export namespace Metaplex {
  // original: plugins/nftModule/operations/createNft.ts
  const createNftBuilder = async (
    params: CreateNftBuilderParams,
    owner: Keypair,
    feePayer: Keypair
  ) => {
    const useNewMint = Keypair.generate();
    const updateAuthority = owner;
    const mintAuthority = owner;
    const tokenOwner = owner.publicKey;

    const inst = await createNftBuilderInstruction(
      feePayer,
      params,
      useNewMint,
      updateAuthority,
      mintAuthority,
      tokenOwner
    );

    return new Instruction(
      inst,
      [feePayer, useNewMint, owner],
      undefined,
      useNewMint.publicKey.toString()
    );
  };

  export const createNftBuilderInstruction = async (
    feePayer: BundlrSigner,
    params: CreateNftBuilderParams,
    useNewMint: Keypair,
    updateAuthority: Keypair | IdentityClient,
    mintAuthority: Keypair | IdentityClient,
    tokenOwner: PublicKey
  ) => {
    debugLog('# params: ', params);
    debugLog('# feePayer: ', feePayer?.publicKey.toString());
    debugLog('# useNewMint: ', useNewMint.publicKey.toString());
    debugLog('# updateAuthority: ', updateAuthority.publicKey.toString());
    debugLog('# mintAuthority: ', mintAuthority.publicKey.toString());
    debugLog('# tokenOwner: ', tokenOwner.toString());

    const metaplex = Bundlr.make(feePayer);
    const payer = metaplex.identity();
    const sftBuilder = await metaplex
      .nfts()
      .builders()
      .createSft({
        ...params,
        payer,
        updateAuthority,
        mintAuthority,
        freezeAuthority: mintAuthority.publicKey,
        useNewMint,
        tokenOwner,
        tokenAmount: token(1),
        decimals: 0,
      });

    const { mintAddress, metadataAddress, tokenAddress } =
      sftBuilder.getContext();
    const masterEditionAddress = findMasterEditionV2Pda(mintAddress);

    return (
      TransactionBuilder.make<CreateNftBuilderContext>()
        .setFeePayer(payer)
        .setContext({
          mintAddress,
          metadataAddress,
          masterEditionAddress,
          tokenAddress: tokenAddress as PublicKey,
        })

        // Create the mint, the token and the metadata.
        .add(sftBuilder)

        // Create master edition account (prevents further minting).
        .add({
          instruction: createCreateMasterEditionV3Instruction(
            {
              edition: masterEditionAddress,
              mint: mintAddress,
              updateAuthority: updateAuthority.publicKey,
              mintAuthority: mintAuthority.publicKey,
              payer: payer.publicKey,
              metadata: metadataAddress,
            },
            {
              createMasterEditionArgs: {
                maxSupply:
                  params.maxSupply === undefined ? 0 : params.maxSupply,
              },
            }
          ),
          signers: [payer, mintAuthority, updateAuthority],
          key:
            params.createMasterEditionInstructionKey ?? 'createMasterEdition',
        })
        .getInstructions()
    );
  };

  export const initNftStorageMetadata = (
    input: InputMetaplexMetadata,
    sellerFeeBasisPoints: number,
    options?: any
  ): NftStorageMetadata => {
    const data = {
      name: input.name,
      symbol: input.symbol,
      description: input.description,
      seller_fee_basis_points: sellerFeeBasisPoints,
      external_url: input.external_url,
      attributes: input.attributes,
      properties: input.properties,
      image: '',
    };
    return { ...data, ...options };
  };

  export const uploadMetaContent = async (
    input: InputMetaplexMetadata,
    feePayer: BundlrSigner
  ) => {
    let storageRes;
    const { filePath, storageType, royalty, options, ...reducedMetadata } =
      input;
    const sellerFeeBasisPoints = Internals_Royalty.convertValue(royalty);
    const storageData = initNftStorageMetadata(
      input,
      sellerFeeBasisPoints,
      options
    );

    if (storageType === 'arweave') {
      storageRes = await (
        await StorageArweave.uploadContent(filePath!, feePayer)
      ).unwrap(
        async (ok: string) => {
          storageData.image = ok;
          return await StorageArweave.uploadMetadata(storageData, feePayer);
        },
        (err) => Result.err(err)
      );
    } else if (storageType === 'nftStorage') {
      storageRes = await (
        await StorageNftStorage.uploadContent(filePath!)
      ).unwrap(
        async (ok: string) => {
          storageData.image = ok;
          return await StorageNftStorage.uploadMetadata(storageData);
        },
        (err) => Result.err(err)
      );
    } else {
      return Result.err(Error('storageType is `arweave` or `nftStorage`'));
    }

    return Result.ok({
      uri: storageRes.unwrap(),
      sellerFeeBasisPoints,
      reducedMetadata,
    });
  };

  /**
   * Upload content and NFT mint
   *
   * @param {InputMetaplexMetadata}  input
   * {
   *   name: string               // nft content name
   *   symbol: string             // nft ticker symbol
   *   filePath: string | File    // nft ticker symbol
   *   royalty: number            // royalty percentage
   *   storageType: 'arweave'|'nftStorage' // royalty percentage
   *   description?: string       // nft content description
   *   external_url?: string      // landing page, home page uri, related url
   *   attributes?: JsonMetadataAttribute[]     // game character parameter, personality, characteristics
   *   properties?: JsonMetadataProperties<Uri> // include file name, uri, supported file type
   *   collection?: Collection                  // collections of different colors, shapes, etc.
   *   [key: string]?: unknown                   // optional param, Usually not used.
   *   creators?: Creator[]          // other creators than owner
   *   uses?: Uses                   // usage feature: burn, single, multiple
   *   isMutable?: boolean           // enable update()
   *   maxSupply?: BigNumber         // mint copies
   * }
   * @param {Keypair} owner          // first minted owner
   * @param {Keypair} feePayer       // fee payer
   * @return Promise<Result<Instruction, Error>>
   */
  export const mint = async (
    input: InputMetaplexMetadata,
    owner: Keypair,
    feePayer?: Keypair
  ): Promise<Result<Instruction, Error | ValidatorError>> => {
    const valid = Validator.checkAll<InputMetaplexMetadata>(input);
    if (valid.isErr) {
      return Result.err(valid.error);
    }

    const payer = feePayer ? feePayer : owner;
    const uploaded = await uploadMetaContent(input, payer);
    if (uploaded.isErr) {
      return Result.err(uploaded.error);
    }

    const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded.value;

    debugLog('# upload content url: ', uri);
    debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
    debugLog('# reducedMetadata: ', reducedMetadata);

    const mintInput: MetaplexMetaData = {
      uri,
      sellerFeeBasisPoints,
      ...reducedMetadata,
    };

    return Result.ok(await createNftBuilder(mintInput, owner, payer));
  };
}
