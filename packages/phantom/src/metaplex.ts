import { PublicKey, Keypair } from '@solana/web3.js';
import { createCreateMasterEditionV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
import {
  findMasterEditionV2Pda,
  CreateNftBuilderParams,
  token,
  TransactionBuilder,
  CreateNftBuilderContext,
} from '@metaplex-foundation/js';

import {
  StorageNftStorage,
  StorageArweave,
  Validator,
  ValidatorError,
  InputMetaplexMetadata,
  MetaplexMetaData,
  MetaplexRoyalty,
  Bundlr,
  NftStorageMetadata,
} from '@solana-suite/nft';
import { debugLog, Node, Result } from '@solana-suite/shared';
import { InitializeMint, Phantom } from './types';

export namespace Metaplex {
  // original: plugins/nftModule/operations/createNft.ts
  const createNftBuilder = async (
    params: CreateNftBuilderParams,
    feePayer: Phantom
  ): Promise<InitializeMint> => {
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

    const transactions = TransactionBuilder.make<CreateNftBuilderContext>()
      .setFeePayer(payer)
      .setContext({
        mintAddress,
        metadataAddress,
        masterEditionAddress,
        tokenAddress: tokenAddress as PublicKey,
      })
      .add(sftBuilder)
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
      .toTransaction();
    const blockhashObj =
      await Node.getConnection().getLatestBlockhashAndContext();
    transactions.recentBlockhash = blockhashObj.value.blockhash;
    transactions.partialSign(useNewMint);
    return { tx: transactions, mint: useNewMint.publicKey };
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
   * @param {Phantom} phantom        phantom wallet object
   * @return Promise<Result<Instruction, Error>>
   */
  export const mint = async (
    input: InputMetaplexMetadata,
    phantom: Phantom
  ): Promise<Result<string, Error | ValidatorError>> => {
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
    debugLog('# upload content url:', uri);
    const mintInput: MetaplexMetaData = {
      uri,
      sellerFeeBasisPoints,
      ...reducedMetadata,
    };
    const connection = Node.getConnection();

    const builder = await createNftBuilder(mintInput, phantom);
    debugLog('# mint: ', builder.mint.toString());
    builder.tx.feePayer = phantom.publicKey;
    const blockhashObj = await connection.getLatestBlockhashAndContext();
    builder.tx.recentBlockhash = blockhashObj.value.blockhash;

    debugLog('# tx: ', builder.tx.signatures);
    const signed = await phantom.signTransaction(builder.tx);
    debugLog('# signed: ', signed.signatures.map(signature => signature.publicKey.toString()));
    const sig = await connection
      .sendRawTransaction(signed.serialize())
      .then(Result.ok)
      .catch(Result.err);

    if (sig.isErr) {
      return Result.err(sig.error);
    }

    await Node.confirmedSig(sig.unwrap());
    return Result.ok(builder.mint.toString());
  };
}
