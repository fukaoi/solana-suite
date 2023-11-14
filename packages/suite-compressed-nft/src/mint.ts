import { InputNftMetadata } from '~/types/nft';
import { Pubkey, Secret } from '~/types/account';
import { Account } from '~/account';
import { Converter } from '~/converter';
import { Storage } from '~/storage';
import { MintTransaction } from '~/transaction';
import { debugLog, Try } from '~/shared';
import { DasApi } from '~/das-api';
import { CompressedNft as Tree } from './tree';
import {
  createDelegateInstruction,
  createMintToCollectionV1Instruction,
  MetadataArgs,
  PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
} from 'mpl-bubblegum-instruction';
import {
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';

import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import bs58 from 'bs58';

export namespace CompressedNft {
  export const bufferToArray = (buffer: Buffer): number[] => {
    const nums = [];
    for (const byte of buffer) {
      nums.push(buffer[byte]);
    }
    return nums;
  };

  export const createDeleagateInstruction = async (
    assetId: PublicKey,
  ): Promise<TransactionInstruction> => {
    let rpcAssetProof = await DasApi.getAssetProof(assetId.toString());
    const rpcAsset = await DasApi.getAsset(assetId.toString());
    if (rpcAssetProof.isErr || rpcAsset.isErr) {
      throw Error('Rise error when get asset proof or asset');
    }
    const compression = rpcAsset.unwrap().compression;
    const ownership = rpcAsset.unwrap().ownership;
    const assetProof = rpcAssetProof.unwrap();

    const treeAuthority = Account.Pda.getTreeAuthority(assetProof.tree_id);
    const previousLeafDelegate = ownership.delegate
      ? new PublicKey(ownership.delegate)
      : new PublicKey(ownership.owner);
    const newLeafDelegate = previousLeafDelegate;
    return createDelegateInstruction(
      {
        treeAuthority,
        leafOwner: new PublicKey(ownership.owner),
        previousLeafDelegate,
        newLeafDelegate,
        merkleTree: new PublicKey(assetProof.tree_id),
        logWrapper: SPL_NOOP_PROGRAM_ID,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
      },
      {
        root: bufferToArray(bs58.decode(assetProof.root)),
        dataHash: bufferToArray(bs58.decode(compression.data_hash.trim())),
        creatorHash: bufferToArray(
          bs58.decode(compression.creator_hash.trim()),
        ),
        nonce: compression.leaf_id,
        index: compression.leaf_id,
      },
    );
  };

  /**
   * Upload content and Compressed NFT mint
   *
   * @param {Pubkey} owner          // first minted owner
   * @param {Secret} signer         // owner's Secret
   * @param {InputNftMetadata} input
   * {
   *   name: string               // nft content name
   *   symbol: string             // nft ticker symbol
   *   filePath: string | File    // nft ticker symbol
   *   royalty: number            // royalty percentage
   *   storageType: 'arweave'|'nftStorage' // Decentralized storage
   *   description?: string       // nft content description
   *   external_url?: string      // landing page, home page uri, related url
   *   attributes?: MetadataAttribute[]     // game character parameter, personality, characteristics
   *   properties?: MetadataProperties<Uri> // include file name, uri, supported file type
   *   collection?: Pubkey           // collections of different colors, shapes, etc.
   *   creators?: InputCreators[]    // other creators than owner
   *   uses?: Uses                   // usage feature: burn, single, multiple
   *   isMutable?: boolean           // enable update()
   *   options?: [key: string]?: unknown       // optional param, Usually not used.
   * }
   * @param {Secret} feePayer?         // fee payer
   * @param {Pubkey} freezeAuthority?  // freeze authority
   * @return Promise<Result<MintInstruction, Error>>
   */
  export const mint = async (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    treeOwner: Pubkey,
    collectionMint: Pubkey,
    feePayer?: Secret,
    receiver?: Pubkey,
  ) => {
    return Try(async () => {
      const payer: Secret = feePayer ? feePayer : signer;
      const leafOwner: Pubkey = receiver ? receiver : owner;

      const treeAuthority = Account.Pda.getTreeAuthority(
        treeOwner.toPublicKey().toString(),
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
      if (input.properties && input.storageType) {
        properties = await Converter.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          input.storageType,
          payer,
        );
      } else if (input.properties && !input.storageType) {
        throw Error('Must set storageType if will use properties');
      }

      input = {
        ...input,
        properties,
      };

      const sellerFeeBasisPoints = Converter.Royalty.intoInfra(input.royalty);
      const nftStorageMetadata = Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints,
      );

      // created at by unix timestamp
      const createdAt = Math.floor(new Date().getTime() / 1000);
      nftStorageMetadata.created_at = createdAt;

      let uri!: string;
      // upload file
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.upload(
          nftStorageMetadata,
          input.filePath,
          input.storageType,
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
          { ...nftStorageMetadata, ...image },
          input.storageType,
          payer,
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else {
        throw Error(`Must set 'storageType + filePath' or 'uri'`);
      }

      let converted = Converter.CompressedNftMetadata.intoInfra(
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
            merkleTree: treeOwner.toPublicKey(),
            treeAuthority,
            treeDelegate: owner.toPublicKey(),
            payer: payer.toKeypair().publicKey,
            leafOwner: leafOwner.toPublicKey(), // receiver
            leafDelegate: owner.toPublicKey(),
            collectionAuthority: owner.toPublicKey(),
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

      return new MintTransaction<Tree.Tree>(
        instructions,
        [signer.toKeypair()],
        payer.toKeypair(),
        new Tree.Tree(treeOwner),
      );
    });
  };
}
