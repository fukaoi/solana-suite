export * from './metadata';
export * from './royalty';

import { CreateNftInput } from '@metaplex-foundation/js';
import { PublicKey, Keypair } from '@solana/web3.js';
import { NftStorageMetadata, StorageNftStorage } from '../storage';
import { Instruction, Result } from '@solana-suite/shared';
import { StorageArweave } from '../storage';
import { MetaplexMetadata } from './metadata';
import { MetaplexRoyalty } from './royalty';

type noNeedOptional =
  | 'payer'
  | 'owner'
  | 'associatedTokenProgram'
  | 'tokenProgram'
  | 'confirmOptions';

export type MetaplexMetadata = Omit<CreateNftInput, noNeedOptional>;

export type NftStorageMetaplexMetadata = NftStorageMetadata &
  Omit<MetaplexMetadata, 'uri'> & {
    filePath?: string | File;
    storageType: 'arweave' | 'nftStorage';
  };

export namespace Metaplex {
  /**
   * Upload content and NFT mint
   *
   * @param {NftStorageMetaplexMetadata}  metadata
   * {
   *   name: {string}               // nft content name
   *   symbol: {string}             // nft ticker symbol
   *   filePath: {string | File}    // nft ticker symbol
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
   * @param {PublicKey} owner        // first minted owner
   * @param {Keypair} feePayer       // fee payer
   * @return Promise<Result<Instruction, Error>>
   */
  export const mint = async (
    metadata: NftStorageMetaplexMetadata,
    owner: PublicKey,
    feePayer: Keypair
  ): Promise<Result<Instruction, Error>> => {
    if (metadata.seller_fee_basis_points) {
      metadata.seller_fee_basis_points = MetaplexRoyalty.convertValue(
        metadata.seller_fee_basis_points
      );
    }

    let uri;
    const { filePath, storageType, ...reducedMetadata } = metadata;
    if (storageType === 'arweave') {
      reducedMetadata.image = (
        await StorageArweave.uploadContent(filePath!, feePayer)
      ).unwrap();
      uri = (
        await StorageArweave.uploadMetadata(reducedMetadata, feePayer)
      ).unwrap();
    } else if (storageType === 'nftStorage') {
      reducedMetadata.image = (
        await StorageArweave.uploadContent(filePath!, feePayer)
      ).unwrap();
      uri = (await StorageNftStorage.uploadMetadata(reducedMetadata)).unwrap();
    } else {
      return Result.err(Error('storageType is `arweave` or `nftStorage`'));
    }

    const mintInput: MetaplexMetadata = {
      uri,
      ...reducedMetadata,
    };

    return MetaplexMetadata.create(mintInput, owner, feePayer);
  };
}
