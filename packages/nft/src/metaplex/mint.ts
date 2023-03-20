import {
  TransactionInstruction,
  PublicKey,
  Keypair,
  Transaction,
} from '@solana/web3.js';
import {
  Result,
  debugLog,
  Try,
  MintInstruction,
  Secret,
  KeypairAccount,
  Pubkey,
  Node,
  PartialSignInstruction,
} from '@solana-suite/shared';
import { Storage, Bundlr } from '@solana-suite/storage';

import {
  Validator,
  InputNftMetadata,
  _InputNftMetadata,
  _MetaplexNftMetaData,
  Creators,
  Collections,
  Properties,
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
    owner: Pubkey,
    signer: Secret,
    feePayer: Secret,
    f: Secret
  ): Promise<MintInstruction> => {
    const mint = KeypairAccount.create();
    const updateAuthority = signer;
    const mintAuthority = signer;

    const inst = await createNftBuilderInstruction(
      f.toKeypair(),
      feePayer.toKeypair(),
      params,
      mint.toKeypair(),
      updateAuthority.toKeypair(),
      mintAuthority.toKeypair(),
      owner
    );

    let creatorSigners: Keypair[] = [feePayer.toKeypair()];
    if (params.creators) {
      creatorSigners = params.creators
        ?.filter((creator) => creator.authority)
        .map((creator) => creator.authority as Keypair);
    }

    return new MintInstruction(
      inst,
      [
        feePayer.toKeypair(),
        mint.toKeypair(),
        signer.toKeypair(),
        ...creatorSigners,
      ],
      undefined,
      mint.pubkey
    );
  };

  export const createNftBuilderInstruction = async (
    f: Keypair,
    feePayer: Keypair | IdentityClient,
    params: CreateNftBuilderParams,
    useNewMint: Keypair,
    updateAuthority: Keypair | IdentityClient,
    mintAuthority: Keypair | IdentityClient,
    tokenOwner: Pubkey
  ): Promise<TransactionInstruction[]> => {
    debugLog('# params: ', params);
    debugLog('# feePayer: ', feePayer);
    debugLog('# useNewMint: ', useNewMint);
    debugLog('# updateAuthority: ', updateAuthority);
    debugLog('# mintAuthority: ', mintAuthority);
    debugLog('# tokenOwner: ', tokenOwner);

    // const f =
    // '4DRpsEkwfAMc7268urkNu2AFC4tweXTLJArwXG9LGvjqcFUoy9mqmBZHLhf2yHEbj3AgrjVppEBQ5hfBTnDzLVSA'.toKeypair();
    const metaplex = Bundlr.make(f); // ok
    // const metaplex = Bundlr.make(updateAuthority); // ng
    const payer = metaplex.identity();
    const sftBuilder = await metaplex
      .nfts()
      .builders()
      .createSft({
        ...params,
        updateAuthority,
        mintAuthority,
        useNewMint,
        tokenOwner: tokenOwner.toPublicKey(),
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
        .setFeePayer(f)
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
   * @param {Pubkey} owner          // first minted owner
   * @param {Secret} signer         // owner's Secret
   * @param {NftMetadata}  input
   * {
   *   name: string               // nft content name
   *   symbol: string             // nft ticker symbol
   *   filePath: string | File    // nft ticker symbol
   *   royalty: number            // royalty percentage
   *   storageType: 'arweave'|'nftStorage' // royalty percentage
   *   description?: string       // nft content description
   *   external_url?: string      // landing page, home page uri, related url
   *   attributes?: MetadataAttribute[]     // game character parameter, personality, characteristics
   *   properties?: MetadataProperties<Uri> // include file name, uri, supported file type
   *   collection?: Pubkey           // collections of different colors, shapes, etc.
   *   [key: string]?: unknown       // optional param, Usually not used.
   *   creators?: InputCreators[]          // other creators than owner
   *   uses?: Uses                   // usage feature: burn, single, multiple
   *   isMutable?: boolean           // enable update()
   *   maxSupply?: BigNumber         // mint copies
   * }
   * @param {Secret} feePayer?       // fee payer
   * @return Promise<Result<Instruction, Error>>
   */
  export const mint = async (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    feePayer?: Pubkey
    // ): Promise<Result<MintInstruction, Error>> => {
  ) => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      //Convert creators
      const creators = Creators.toInputConvert(input.creators);
      debugLog('# creators: ', creators);

      //Convert collection
      const collection = Collections.toInputConvert(input.collection);
      debugLog('# collection: ', collection);

      //Convert porperties, Upload content
      const properties = await Properties.toInputConvert(
        input.properties,
        Storage.uploadContent,
        input.storageType,
        feePayer
      );
      debugLog('# properties: ', properties);

      const overwrited = {
        ...input,
        creators,
        collection,
        properties,
      } as _InputNftMetadata;

      const uploaded = await Storage.uploadMetaContent(overwrited);
      const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;

      debugLog('# upload content url: ', uri);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# reducedMetadata: ', reducedMetadata);

      const mintInput: _MetaplexNftMetaData = {
        uri,
        sellerFeeBasisPoints,
        ...reducedMetadata,
      };

      const f = KeypairAccount.create();

      const instructions = await createNftBuilder(
        mintInput,
        owner,
        signer,
        signer,
        f.secret
      );

      const blockhashObj = await Node.getConnection().getLatestBlockhash();

      const tx = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer?.toKeypair().publicKey,
      });

      tx.recentBlockhash = blockhashObj.blockhash;
      instructions.instructions.forEach((inst) => tx.add(inst));

      instructions.signers.forEach((s) => console.log(s.publicKey.toString()));

      // const f =
      // '4DRpsEkwfAMc7268urkNu2AFC4tweXTLJArwXG9LGvjqcFUoy9mqmBZHLhf2yHEbj3AgrjVppEBQ5hfBTnDzLVSA'.toKeypair();
      tx.partialSign(f.toKeypair());
      instructions.signers.forEach((signer) => tx.partialSign(signer));
      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new PartialSignInstruction(hex);
    });
  };
}
