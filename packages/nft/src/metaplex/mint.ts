import { PublicKey, Keypair, TransactionInstruction } from "@solana/web3.js";

import {
  CreateNftInput,
  createNftOperation,
  createNftBuilder,
  CreateNftOperation,
  findMetadataPda,
  findMasterEditionV2Pda,
  findAssociatedTokenAccountPda,
  JsonMetadata,
} from "@metaplex-foundation/js";

import { DataV2, Creator } from "@metaplex-foundation/mpl-token-metadata";

import {
  Node,
  Instruction,
  Result,
  debugLog,
} from "@solana-suite/shared";

import {
  getMinimumBalanceForRentExemptMint,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { MetaplexMetadata, NftStorageMetaplexMetadata } from ".";
import { StorageArweave } from "../storage";
import { Bundlr } from "../bundlr";

export namespace Metaplex {
  /**
   * NFT mint
   *
   * @param {MetaplexMetadata}  input
   * {
   *   uri: {string}                 // basically storage uri
   *   name?: {string}               // NFT content name
   *   symbol?: {string}             // NFT ticker symbol
   *   sellerFeeBasisPoints?: number // Royalty percentage
   *   creators?: Creator[]          // Other creators than owner
   *   collection?: Collection       // collections of different colors, shapes, etc.
   *   uses?: Uses                   // Usage feature: Burn, Single, Multiple
   *   isMutable?: boolean           // enable update()
   *   maxSupply?: BigNumber         // mint copies
   *   mintAuthority?: Signer        // mint authority
   *   updateAuthority?: Signer      // update minted authority
   *   freezeAuthority?: PublicKey   // freeze minted authority
   * }
   * @param {PublicKey} owner        // PublicKey that Owns nft
   * @param {Keypair} feePayer       // fee payer
   * @return {Promise<Result<Instruction, Error>>}
   */
  export const mint = async (
    input: MetaplexMetadata,
    owner: PublicKey,
    feePayer: Keypair
  ): Promise<Result<Instruction, Error>> => {
    const operation = createNftOperation(input);
    const mint = Keypair.generate();
    const tx = await createNft(operation, mint, owner, feePayer);

    // @todo  call validation

    return Result.ok(
      new Instruction(tx, [mint], feePayer, mint.publicKey.toString())
    );
  };

  const resolveData = (
    input: CreateNftInput,
    metadata: JsonMetadata,
    updateAuthority: PublicKey
  ): DataV2 => {
    const metadataCreators: Creator[] | undefined =
      metadata.properties?.creators
        ?.filter((creator) => creator.address)
        .map((creator) => ({
          address: new PublicKey(creator.address as string),
          share: creator.share ?? 0,
          verified: false,
        }));

    let creators = input.creators ?? metadataCreators ?? undefined;

    if (creators === undefined) {
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
          return { ...creator, verified: true };
        } else {
          return creator;
        }
      });
    }

    return {
      name: input.name ?? metadata.name ?? "",
      symbol: input.symbol ?? metadata.symbol ?? "",
      uri: input.uri,
      sellerFeeBasisPoints:
        input.sellerFeeBasisPoints ?? metadata.seller_fee_basis_points ?? 500,
      creators,
      collection: input.collection ?? null,
      uses: input.uses ?? null,
    };
  };

  /**
   * Upload content and NFT mint
   *
   * @param {NftStorageMetaplexMetadata}  input
   * {
   *   name?: {string}               // nft content name
   *   symbol?: {string}             // nft ticker symbol
   *   filePath?: {string | File}    // nft ticker symbol
   *   description?: {string}        // nft content description
   *   external_url?: {string}       // landing page, home page uri, related url
   *   sellerFeeBasisPoints?: number // royalty percentage
   *   attributes?: {JsonMetadataAttribute[]}     // game character parameter, personality, characteristics
   *   properties?: {JsonMetadataProperties<Uri>} // include file name, uri, supported file type
   *   collection?: Collection                    // collections of different colors, shapes, etc.
   *   [key: string]: {unknown}                   // optional param, Usually not used.
   *   creators?: Creator[]          // other creators than owner
   *   uses?: Uses                   // usage feature: burn, single, multiple
   *   isMutable?: boolean           // enable update()
   *   maxSupply?: BigNumber         // mint copies
   *   mintAuthority?: Signer        // mint authority
   *   updateAuthority?: Signer      // update minted authority
   *   freezeAuthority?: PublicKey   // freeze minted authority
   * }
   * @param {Keypair} feePayer       // fee payer
   * @return Promise<Result<Instruction, Error>>
   */
  export const uploadContentMint = async (
    input: NftStorageMetaplexMetadata,
    owner: PublicKey,
    feePayer: Keypair
  ): Promise<Result<Instruction, Error>> => {
    const upload = await StorageArweave.uploadContent(input.filePath, feePayer);
    input.image = upload.unwrap();

    const uploadMetadata = await StorageArweave.uploadMetadata(input, feePayer);
    input.uri = uploadMetadata.unwrap();
    input.storageType = "arweave";

    const mintInput: MetaplexMetadata = {
      uri: uploadMetadata.unwrap(),
      ...input,
    };

    return mint(mintInput, owner, feePayer);
  };

  const createNft = async (
    operation: CreateNftOperation,
    mint: Keypair,
    owner: PublicKey,
    feePayer: Keypair
  ): Promise<TransactionInstruction[]> => {
    const {
      uri,
      isMutable,
      maxSupply,
      payer = feePayer,
      mintAuthority = feePayer,
      updateAuthority = mintAuthority,
      freezeAuthority,
      tokenProgram = TOKEN_PROGRAM_ID,
      associatedTokenProgram,
    } = operation.input;

    debugLog("# metadata input: ", operation.input);
    debugLog("# metadata feePayer: ", feePayer.publicKey.toString());
    debugLog("# metadata mint: ", mint.publicKey.toString());
    debugLog("# mintAuthority: ", mintAuthority.publicKey.toString());
    debugLog("# updateAuthority: ", updateAuthority.publicKey.toString());
    debugLog("# owner: ", owner.toString());
    freezeAuthority &&
      debugLog("# freezeAuthority: ", freezeAuthority.toString());

    // const json = await init(feePayer).storage().downloadJson(uri)
    //   .then(Result.ok)
    //   .catch(Result.err);

    // const metadata: JsonMetadata<string> = json.isOk ? json.value : {} as JsonMetadata<string>;

    let metadata = {};
    try {
      metadata = await Bundlr.make(feePayer).storage().downloadJson(uri);
    } catch (e) {
      debugLog("# Error in createNft:", e);
      metadata = {};
    }

    const data = resolveData(
      operation.input,
      metadata,
      updateAuthority.publicKey
    );

    const metadataPda = findMetadataPda(mint.publicKey);
    const masterEditionPda = findMasterEditionV2Pda(mint.publicKey);
    const lamports = await getMinimumBalanceForRentExemptMint(
      Node.getConnection()
    );

    const associatedToken = findAssociatedTokenAccountPda(
      mint.publicKey,
      owner,
      tokenProgram,
      associatedTokenProgram
    );

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
      associatedTokenProgram,
    }).getInstructions();
  };
}
