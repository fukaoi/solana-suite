import { InputNftMetadata } from '~/types/regular-nft';
import { Pubkey, Secret } from '~/types/account';
import { Account } from '~/account';
import { Converter } from '~/converter';
import { Storage } from '~/storage';
import { Node } from '~/node';
import { TransactionBuilder } from '~/transaction-builder';
import { debugLog, Result, Try } from '~/suite-utils';
import { Validator } from '~/validator';
import { DasApi } from '~/das-api';
import {
  computeCreatorHash,
  computeDataHash,
  createMintToCollectionV1Instruction,
  createVerifyCreatorInstruction,
  Creator,
  MetadataArgs,
  PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
} from 'mpl-bubblegum-instruction';
import {
  ConcurrentMerkleTreeAccount,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';

import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import {
  AccountMeta,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import { MintOptions } from '~/types/compressed-nft';
import { CommonStructure, MintStructure } from '~/types/transaction-builder';

export namespace CompressedNft {
  const DEFAULT_STORAGE_TYPE = 'nftStorage';

  /**
   * @internal
   */
  export const createVerifyCreator = async (
    creators: Creator[],
    assetId: PublicKey,
    treeOwner: PublicKey,
    metadata: MetadataArgs,
    feePayer: PublicKey,
  ): Promise<TransactionInstruction> => {
    const rpcAssetProof = await DasApi.getAssetProof(assetId.toString());
    const rpcAsset = await DasApi.getAsset(assetId.toString());
    if (rpcAssetProof.isErr || rpcAsset.isErr) {
      throw Error('Rise error when get asset proof or asset');
    }
    const compression = rpcAsset.value.compression;
    const ownership = rpcAsset.value.ownership;
    const assetProof = rpcAssetProof.value;

    const treeAccount = await ConcurrentMerkleTreeAccount.fromAccountAddress(
      Node.getConnection(),
      treeOwner,
    );
    const canopyDepth = treeAccount.getCanopyDepth();
    const slicedProof: AccountMeta[] = assetProof.proof
      .map((node: string) => ({
        pubkey: node.toPublicKey(),
        isSigner: false,
        isWritable: false,
      }))
      .slice(0, assetProof.proof.length - (canopyDepth ? canopyDepth : 0));

    return createVerifyCreatorInstruction(
      {
        treeAuthority: treeOwner,
        leafOwner: ownership.owner.toPublicKey(),
        leafDelegate: (ownership.delegate || ownership.owner).toPublicKey(),
        merkleTree: assetProof.tree_id.toPublicKey(),
        payer: feePayer,

        logWrapper: SPL_NOOP_PROGRAM_ID,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        creator: feePayer,

        // provide the sliced proof
        anchorRemainingAccounts: slicedProof,
      },
      {
        root: [...assetProof.root.trim().toPublicKey().toBytes()],
        creatorHash: [...computeCreatorHash(creators)],
        dataHash: [...computeDataHash(metadata)],
        nonce: compression.leaf_id,
        index: compression.leaf_id,
        message: metadata,
      },
    );
  };

  /**
   * Upload content and Compressed NFT mint
   *
   * @param {Secret} owner         // owner's Secret
   * @param {InputNftMetadata} input
   * {
   *   name: string               // nft content name
   *   symbol: string             // nft ticker symbol
   *   royalty: number            // royalty percentage
   *   storageType: 'arweave'|'nftStorage' // Decentralized storage
   *   uri?: string | File        // uploaded content url
   *   filePath?: string | File   // upload content
   *   description?: string       // nft content description
   *   external_url?: string      // landing page, home page uri, related url
   *   attributes?: MetadataAttribute[]     // game character parameter, personality, characteristics
   *   properties?: MetadataProperties<Uri> // include file name, uri, supported file type
   *   collection?: Pubkey           // collections of different colors, shapes, etc.
   *   isMutable?: boolean           // enable update()
   *   options?: [key: string]?: unknown       // optional param, Usually not used.
   * }
   * @param {Pubkey} spaceOwner      // Previously created space owner
   * @param {Pubkey} collectionMint // Previously created collectionMint
   * @param {Partial<MintOptions>} options         // mint options
   * @return Promise<Result<MintTransaction, Error>>
   */
  export const mint = async (
    owner: Secret,
    input: InputNftMetadata,
    spaceOwner: Pubkey,
    collectionMint: Pubkey,
    options: Partial<MintOptions> = {},
  ): Promise<Result<CommonStructure, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const { feePayer, receiver, delegate } = options;
      const payer = feePayer ? feePayer : owner;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const ownerPublicKey = owner.toKeypair().publicKey;
      const leafOwner = receiver ? receiver.toPublicKey() : ownerPublicKey;
      const leafDelegate = delegate
        ? delegate
        : new Account.Keypair({ secret: payer! }).pubkey;

      const treeAuthority = Account.Pda.getTreeAuthority(
        spaceOwner.toPublicKey().toString(),
      );
      const collectionMetadata = Account.Pda.getMetadata(
        collectionMint.toString(),
      );
      const collectionMasterEditionAccount = Account.Pda.getMasterEdition(
        collectionMint.toString(),
      );
      const bubblegumSigner = Account.Pda.getBgumSigner();

      // porperties, Upload content
      let properties;
      if (input.properties) {
        properties = await Converter.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          storageType,
          payer,
        );
      }

      input = {
        ...input,
        properties,
        storageType,
      };

      const royalty = input.royalty ? input.royalty : 0;
      const sellerFeeBasisPoints = Converter.Royalty.intoInfra(royalty);
      const storageMetadata = Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints,
      );

      let uri!: string;
      // upload file
      if (input.filePath) {
        const uploaded = await Storage.upload(
          storageMetadata,
          input.filePath,
          storageType,
          payer,
        );
        debugLog('# upload content url: ', uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
        // uploaded file
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          payer,
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else {
        throw Error(`Must set filePath' or 'uri'`);
      }

      const converted = Converter.CompressedNftMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints,
      );

      const metadataArgs: MetadataArgs = {
        ...converted,
        collection: { key: collectionMint.toPublicKey(), verified: false },
      };

      debugLog('# input: ', input);
      debugLog('# metadataArgs: ', metadataArgs);

      const instructions = [];
      instructions.push(
        createMintToCollectionV1Instruction(
          {
            merkleTree: spaceOwner.toPublicKey(),
            treeAuthority,
            treeDelegate: ownerPublicKey,
            payer: payer.toKeypair().publicKey,
            leafOwner: leafOwner, // receiver
            leafDelegate: leafDelegate.toPublicKey(),
            collectionAuthority: ownerPublicKey,
            collectionMint: collectionMint.toPublicKey(),
            collectionMetadata,
            editionAccount: collectionMasterEditionAccount,
            bubblegumSigner,
            logWrapper: SPL_NOOP_PROGRAM_ID,
            collectionAuthorityRecordPda: BUBBLEGUM_PROGRAM_ID,
            compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          },
          {
            metadataArgs,
          },
        ),
      );

      // if (input.creators) {
      //   const assetId = await new Space.Space(spaceOwner).getAssetId();
      //   instructions.push(
      //     await createVerifyCreator(
      //       metadataArgs.creators,
      //       assetId.toPublicKey(),
      //       spaceOwner.toPublicKey(),
      //       metadataArgs,
      //       payer.toKeypair().publicKey,
      //     ),
      //   );
      // }

      return new TransactionBuilder.Common(
        instructions,
        [owner.toKeypair()],
        payer.toKeypair(),
      );
    });
  };
}
