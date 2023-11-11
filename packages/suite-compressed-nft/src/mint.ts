import { InputNftMetadata } from '~/types/regular-nft';
import { Pubkey, Secret } from '~/types/account';
import { Account } from '~/account';
import { Converter } from '~/converter';
import { Storage } from '~/storage';
import { MintTransaction } from '~/transaction';
import { debugLog } from '~/shared';
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
export namespace CompressedNft {
  export const mint = async (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    treeOwner: Pubkey,
    collectionMint: Pubkey,
    feePayer?: Secret,
    receiver?: Pubkey,
    freezeAuthority?: Pubkey,
  ) => {
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
    const bgumSigner = Account.Pda.getBgumSigner();

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

    const instruction = createMintToCollectionV1Instruction(
      {
        merkleTree: treeOwner.toPublicKey(),
        treeAuthority,
        treeDelegate: owner.toPublicKey(),
        payer: payer.toKeypair().publicKey,
        leafOwner: leafOwner.toPublicKey(), // receiver
        leafDelegate: owner.toPublicKey(),
        collectionAuthority: owner.toPublicKey(),
        collectionMint: collectionMint.toPublicKey(),
        collectionMetadata: collectionMetadata,
        editionAccount: collectionMasterEditionAccount,
        bubblegumSigner: bgumSigner,
        logWrapper: SPL_NOOP_PROGRAM_ID,
        collectionAuthorityRecordPda: BUBBLEGUM_PROGRAM_ID,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      },
      {
        metadataArgs: metadataArgs,
      },
    );
    return new MintTransaction<Tree.Tree>(
      [instruction],
      [signer.toKeypair()],
      payer.toKeypair(),
      new Tree.Tree(treeOwner),
    );
  };
}
