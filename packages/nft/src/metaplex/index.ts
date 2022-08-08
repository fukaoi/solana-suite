export * from './metadata';
export * from './royalty';

import { CreateNftInput } from '@metaplex-foundation/js';
import { PublicKey, Keypair } from '@solana/web3.js';
import { NftStorageMetadata } from '../storage';
import { Instruction, Result } from '@solana-suite/shared';
import { StorageArweave } from '../storage';
import {MetaplexMetadata} from './metadata';

type noNeedOptional =
  | 'payer'
  | 'owner'
  | 'associatedTokenProgram'
  | 'tokenProgram'
  | 'confirmOptions';

export type MetaplexMetadata = Omit<CreateNftInput, noNeedOptional>;

export type NftStorageMetaplexMetadata = NftStorageMetadata &
  Omit<MetaplexMetadata, 'uri'> & {
    filePath: string | File;
    storageType: 'arweave' | 'nftStorage';
  };

export module Metaplex {
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
  export const mint = async (
    input: NftStorageMetaplexMetadata,
    owner: PublicKey,
    feePayer: Keypair
  ): Promise<Result<Instruction, Error>> => {
    const upload = await StorageArweave.uploadContent(input.filePath, feePayer);
    input.image = upload.unwrap();

    const uploadMetadata = await StorageArweave.uploadMetadata(input, feePayer);
    input.uri = uploadMetadata.unwrap();
    input.storageType = 'arweave';

    const mintInput: MetaplexMetadata = {
      uri: uploadMetadata.unwrap(),
      ...input,
    };

    return MetaplexMetadata.mint(mintInput, owner, feePayer);
  };
}
