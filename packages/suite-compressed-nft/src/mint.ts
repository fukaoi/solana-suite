import { InputNftMetadata } from '~/types/regular-nft';
import { Pubkey, Secret } from '~/types/account';
import { Account } from '~/account';
import { Converter } from '~/converter';
import { Storage } from '~/storage';
import { TransactionBuilder } from '~/transaction-builder';
import { debugLog, Result, Try, unixTimestamp, Validator } from '~/shared';
import { CompressedNft as Tree } from './tree';
import {
  createMintToCollectionV1Instruction,
  MetadataArgs,
  PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
} from 'mpl-bubblegum-instruction';
import {
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';

import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { MintOptions } from '~/types/compressed-nft';
import { MintStructure } from '~/types/transaction-builder';

export namespace CompressedNft {
  const DEFAULT_STORAGE_TYPE = 'nftStorage';

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
   *   isMutable?: boolean           // enable update()
   *   options?: [key: string]?: unknown       // optional param, Usually not used.
   * }
   * @param {Partial<MintOptions>} options         // mint options
   * @return Promise<Result<MintTransaction, Error>>
   */
  export const mint = async (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    treeOwner: Pubkey,
    collectionMint: Pubkey,
    options: Partial<MintOptions> = {},
  ): Promise<Result<MintStructure<Tree.Tree>, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const { feePayer, receiver, delegate } = options;
      const payer = feePayer ? feePayer : signer;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const leafOwner = receiver ? receiver : owner;
      const leafDelegate = delegate
        ? delegate
        : new Account.Keypair({ secret: payer }).pubkey;

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

      const sellerFeeBasisPoints = Converter.Royalty.intoInfra(input.royalty);
      const storageMetadata = Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints,
      );

      // created at by unix timestamp
      storageMetadata.created_at = unixTimestamp();

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
            merkleTree: treeOwner.toPublicKey(),
            treeAuthority,
            treeDelegate: owner.toPublicKey(),
            payer: payer.toKeypair().publicKey,
            leafOwner: leafOwner.toPublicKey(), // receiver
            leafDelegate: leafDelegate.toPublicKey(),
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

      return new TransactionBuilder.Mint(
        instructions,
        [signer.toKeypair()],
        payer.toKeypair(),
        new Tree.Tree(treeOwner),
      );
    });
  };
}
