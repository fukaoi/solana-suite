import { PublicKey, Keypair, TransactionInstruction } from '@solana/web3.js';
import { Result, debugLog, Try, MintInstruction } from '@solana-suite/shared';
import { Storage } from '@solana-suite/storage';

import {
  Bundlr,
  BundlrSigner,
  Validator,
  InputNftMetadata,
  MetaplexNftMetaData,
} from '@solana-suite/shared-metaplex';

import {
  CreateNftBuilderParams,
  token,
  TransactionBuilder,
  CreateNftBuilderContext,
} from '@metaplex-foundation/js';
import { IdentityClient } from '@metaplex-foundation/js/dist/types/plugins/identityModule';
import { createCreateMasterEditionV3Instruction } from '@metaplex-foundation/mpl-token-metadata';

export namespace Metaplex {
  // original: plugins/nftModule/operations/createNft.ts
  const createNftBuilder = async (
    params: CreateNftBuilderParams,
    owner: Keypair,
    feePayer: Keypair
  ): Promise<MintInstruction> => {
    const mint = Keypair.generate();
    const updateAuthority = owner;
    const mintAuthority = owner;
    const tokenOwner = owner.publicKey;

    const inst = await createNftBuilderInstruction(
      feePayer,
      params,
      mint,
      updateAuthority,
      mintAuthority,
      tokenOwner
    );

    return new MintInstruction(
      inst,
      [feePayer, mint, owner],
      undefined,
      mint.publicKey.toString()
    );
  };

  export const createNftBuilderInstruction = async (
    feePayer: BundlrSigner,
    params: CreateNftBuilderParams,
    useNewMint: Keypair,
    updateAuthority: Keypair | IdentityClient,
    mintAuthority: Keypair | IdentityClient,
    tokenOwner: PublicKey
  ): Promise<TransactionInstruction[]> => {
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
        updateAuthority,
        mintAuthority,
        useNewMint,
        tokenOwner,
        tokenAmount: token(1),
        decimals: 0,
      });

    const { mintAddress, metadataAddress, tokenAddress } =
      sftBuilder.getContext();
    const masterEditionAddress = metaplex
      .nfts()
      .pdas()
      .masterEdition({ mint: mintAddress });

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

  /**
   * Upload content and NFT mint
   *
   * @param {NftMetadata}  input
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
    input: InputNftMetadata,
    owner: Keypair,
    feePayer?: Keypair
  ): Promise<Result<MintInstruction, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const payer = feePayer ? feePayer : owner;
      const uploaded = await Storage.uploadMetaContent(input, payer);
      const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;

      debugLog('# upload content url: ', uri);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# reducedMetadata: ', reducedMetadata);

      const mintInput: MetaplexNftMetaData = {
        uri,
        sellerFeeBasisPoints,
        ...reducedMetadata,
      };
      return await createNftBuilder(mintInput, owner, payer);
    });
  };
}
