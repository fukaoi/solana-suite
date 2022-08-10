import { PublicKey, Keypair, TransactionInstruction } from '@solana/web3.js';

import {
  CreateNftInput,
  createNftOperation,
  createNftBuilder,
  CreateNftOperation,
  findMetadataPda,
  findMasterEditionV2Pda,
  findAssociatedTokenAccountPda,
  JsonMetadata,
} from '@metaplex-foundation/js';

import { DataV2, Creator } from '@metaplex-foundation/mpl-token-metadata';

import { Node, Instruction, Result, debugLog } from '@solana-suite/shared';

import {
  getMinimumBalanceForRentExemptMint,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import { Bundlr } from '../bundlr';
import { MetaplexMetadata as Metadata } from './index';
import { MetaplexRoyalty } from './royalty';

export namespace MetaplexMetadata {
  /**
   * NFT mint
   *
   * @param {MetaplexMetadata}  metadata
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
  export const create = async (
    metadata: Metadata,
    owner: PublicKey,
    feePayer: Keypair
  ): Promise<Result<Instruction, Error>> => {
    // @todo  call validation

    if (metadata.sellerFeeBasisPoints) {
      metadata.sellerFeeBasisPoints = MetaplexRoyalty.convertValue(
        metadata.sellerFeeBasisPoints
      );
    }
    const operation = createNftOperation(metadata);
    const mint = Keypair.generate();
    const tx = await createNft(operation, mint, owner, feePayer);

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

  const createNft = async (
    operation: CreateNftOperation,
    mint: Keypair,
    owner: PublicKey,
    feePayer: Keypair
  ): Promise<TransactionInstruction[]> => {
    const {
      // uri,
      isMutable,
      maxSupply,
      payer = feePayer,
      mintAuthority = feePayer,
      updateAuthority = mintAuthority,
      freezeAuthority,
      tokenProgram = TOKEN_PROGRAM_ID,
      associatedTokenProgram,
    } = operation.input;

    debugLog('# metadata input: ', operation.input);
    debugLog('# metadata feePayer: ', feePayer.publicKey.toString());
    debugLog('# metadata mint: ', mint.publicKey.toString());
    debugLog('# mintAuthority: ', mintAuthority.publicKey.toString());
    debugLog('# updateAuthority: ', updateAuthority.publicKey.toString());
    debugLog('# owner: ', owner.toString());
    freezeAuthority &&
      debugLog('# freezeAuthority: ', freezeAuthority.toString());

    const metadata = {};
    // try {
    //   metadata = await Bundlr.make(feePayer).storage().downloadJson(uri);
    // } catch (e) {
    //   debugLog('# Error in createNft:', e);
    //   metadata = {};
    // }

    const data = resolveData(
      operation.input,
      metadata,
      updateAuthority.publicKey
    );

    debugLog('# resolveData: ', data);

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
