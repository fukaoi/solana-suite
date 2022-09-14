import { PublicKey, Keypair, Transaction } from '@solana/web3.js';
import {
  StorageNftStorage,
  StorageArweave,
  Validator,
  ValidatorError,
  InputMetaplexMetadata,
  MetaplexMetaData,
  MetaplexRoyalty,
  Bundlr,
  Phantom,
  NftStorageMetadata,
} from '@solana-suite/nft';
import { Instruction, Node, Result } from '@solana-suite/shared';
import { createCreateMasterEditionV3Instruction } from '@metaplex-foundation/mpl-token-metadata';

import {
  findMasterEditionV2Pda,
  CreateNftBuilderParams,
  token,
  TransactionBuilder,
  CreateNftBuilderContext,
} from '@metaplex-foundation/js';

export namespace Metaplex {
  // original: plugins/nftModule/operations/createNft.ts
  export const createNftBuilder = async (
    params: CreateNftBuilderParams,
    feePayer: Phantom
  ) => {
    const metaplex = Bundlr.make(feePayer);
    const useNewMint = Keypair.generate();
    const payer = metaplex.identity();
    const updateAuthority = metaplex.identity();
    const mintAuthority = metaplex.identity();
    const tokenOwner = metaplex.identity().publicKey;

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

  const initNftStorageMetadata = (
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
    phantom: Phantom
    // ): Promise<Result<Instruction, Error | ValidatorError>> => {
  ) => {
    const valid = Validator.checkAll<InputMetaplexMetadata>(input);
    if (valid.isErr) {
      return Result.err(valid.error);
    }

    let storageRes;
    const { filePath, storageType, royalty, ...reducedMetadata } = input;
    const sellerFeeBasisPoints = MetaplexRoyalty.convertValue(royalty);

    const storageMetadata = initNftStorageMetadata(input, sellerFeeBasisPoints);

    if (storageType === 'arweave') {
      storageRes = await (
        await StorageArweave.uploadContent(filePath!, phantom)
      ).unwrap(
        async (ok: string) => {
          storageMetadata.image = ok;
          return await StorageArweave.uploadMetadata(storageMetadata, phantom);
        },
        (err: Error) => Result.err(err)
      );
    } else if (storageType === 'nftStorage') {
      storageRes = await (
        await StorageNftStorage.uploadContent(filePath!)
      ).unwrap(
        async (ok: string) => {
          storageMetadata.image = ok;
          return await StorageNftStorage.uploadMetadata(storageMetadata);
        },
        (err: Error) => Result.err(err)
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

    const instructions = await createNftBuilder(mintInput, phantom);
    const connection = Node.getConnection();
    const transaction = new Transaction();
    transaction.feePayer = phantom.publicKey;
    instructions.forEach((inst) => transaction.add(inst));
    const blockhashObj = await connection.getLatestBlockhashAndContext();
    transaction.recentBlockhash = blockhashObj.value.blockhash;
    const signed = await phantom.signTransaction(transaction);
    const sig = await connection
      .sendRawTransaction(signed.serialize())
      .then(Result.ok)
      .catch(Result.err);

    console.log(sig);

    if (sig.isErr) {
      return Result.err(sig.error);
    }

    await Node.confirmedSig(sig.unwrap());
    return Result.ok(sig.unwrap());
  };
}
