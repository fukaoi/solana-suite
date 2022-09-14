import { PublicKey, Keypair } from '@solana/web3.js';
import { StorageNftStorage, StorageArweave } from '../storage';
import { Instruction, Result } from '@solana-suite/shared';
import { Validator, ValidatorError } from '../validator';
import {
  InputMetaplexMetadata,
  MetaplexMetaData,
} from '../types/metaplex/index';
import { MetaplexRoyalty } from './royalty';
import { Bundlr } from '../bundlr';

import { createCreateMasterEditionV3Instruction } from '@metaplex-foundation/mpl-token-metadata';

import {
  findMasterEditionV2Pda,
  CreateNftBuilderParams,
  token,
  TransactionBuilder,
  CreateNftBuilderContext,
} from '@metaplex-foundation/js';
import { NftStorageMetadata } from '../types';

export namespace Metaplex {
  // original: plugins/nftModule/operations/createNft.ts
  const createNftBuilder = async (
    params: CreateNftBuilderParams,
    owner: Keypair,
    feePayer: Keypair
  ) => {
    const metaplex = Bundlr.make();
    const useNewMint = Keypair.generate();
    const payer = feePayer;
    const updateAuthority = owner;
    const mintAuthority = owner;
    const tokenOwner = owner.publicKey;

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

    const inst = TransactionBuilder.make<CreateNftBuilderContext>()
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
              maxSupply: params.maxSupply === undefined ? 0 : params.maxSupply,
            },
          }
        ),
        signers: [payer, mintAuthority, updateAuthority],
        key: params.createMasterEditionInstructionKey ?? 'createMasterEdition',
      })
      .getInstructions();

    return new Instruction(
      inst,
      [feePayer, useNewMint, owner],
      undefined,
      useNewMint.publicKey.toString()
    );
  };

  export const initNftStorageMetadata = (
    input: InputMetaplexMetadata,
    sellerFeeBasisPoints: number
  ): NftStorageMetadata => {
    return {
      name: input.name,
      symbol: input.symbol,
      description: input.description,
      seller_fee_basis_points: sellerFeeBasisPoints,
      external_url: input.external_url,
      attributes: input.attributes,
      properties: input.properties,
      image: '',
    };
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

    let storageRes;
    const { filePath, storageType, royalty, ...reducedMetadata } = input;
    const sellerFeeBasisPoints = MetaplexRoyalty.convertValue(royalty);
    const storageMetadata = initNftStorageMetadata(input, sellerFeeBasisPoints);

    if (storageType === 'arweave') {
      storageRes = await (
        await StorageArweave.uploadContent(filePath!, payer)
      ).unwrap(
        async (ok: string) => {
          storageMetadata.image = ok;
          return await StorageArweave.uploadMetadata(storageMetadata, payer);
        },
        (err) => Result.err(err)
      );
    } else if (storageType === 'nftStorage') {
      storageRes = await (
        await StorageNftStorage.uploadContent(filePath!)
      ).unwrap(
        async (ok: string) => {
          storageMetadata.image = ok;
          return await StorageNftStorage.uploadMetadata(storageMetadata);
        },
        (err) => Result.err(err)
      );
    } else {
      return Result.err(Error('storageType is `arweave` or `nftStorage`'));
    }

    if (storageRes.isErr) {
      return Result.err(storageRes.error);
    }

    const uri = storageRes.unwrap();
    const mintInput: MetaplexMetaData = {
      uri,
      sellerFeeBasisPoints,
      ...reducedMetadata,
    };

    return Result.ok(await createNftBuilder(mintInput, owner, payer));
  };
}
