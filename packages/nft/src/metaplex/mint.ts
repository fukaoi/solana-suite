import { PublicKey, Keypair } from '@solana/web3.js';
import { StorageNftStorage } from '../storage';
import {
  Instruction,
  Result,
} from '@solana-suite/shared';
import { StorageArweave } from '../storage';
import { InternalsMetaplex_Mint } from '../internals/metaplex/_mint';
import { Validator, ValidatorError } from '../validator';
import {
  NftStorageMetaplexMetadata,
  MetaplexMetaData,
} from '../types/metaplex/mint';

export namespace Metaplex {
  /**
   * Upload content and NFT mint
   *
   * @param {NftStorageMetaplexMetadata}  metadata
   * {
   *   name: string               // nft content name
   *   symbol: string             // nft ticker symbol
   *   filePath: string | File    // nft ticker symbol
   *   royalty: number            // royalty percentage
   *   description?: string       // nft content description
   *   external_url?: string      // landing page, home page uri, related url
   *   attributes?: JsonMetadataAttribute[]     // game character parameter, personality, characteristics
   *   properties?: JsonMetadataProperties<Uri> // include file name, uri, supported file type
   *   collection?: Collection                  // collections of different colors, shapes, etc.
   *   [key: string]: unknown                   // optional param, Usually not used.
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
  ): Promise<Result<Instruction, Error | ValidatorError>> => {
    const valid = Validator.checkAll<NftStorageMetaplexMetadata>(metadata);
    if (valid.isErr) {
      return Result.err(valid.error);
    }

    let storageRes!: any;
    const { filePath, storageType, royalty, ...reducedMetadata } = metadata;
    if (storageType === 'arweave') {
      storageRes = (
        await StorageArweave.uploadContent(filePath!, feePayer)
      ).unwrap(
        async (ok: string) => {
          reducedMetadata.image = ok;
          return await StorageArweave.uploadMetadata(reducedMetadata, feePayer);
        },
        (err) => err
      );
    } else if (storageType === 'nftStorage') {
      storageRes = (await StorageNftStorage.uploadContent(filePath!)).unwrap(
        async (ok: string) => {
          reducedMetadata.image = ok;
          return await StorageNftStorage.uploadMetadata(reducedMetadata);
        },
        (err) => Result.err(err)
      );
    } else {
      return Result.err(Error('storageType is `arweave` or `nftStorage`'));
    }

    if ((await storageRes).isErr) {
      return storageRes;
    }

    const uri = (await storageRes).unwrap();
    const mintInput: MetaplexMetaData = {
      uri,
      ...reducedMetadata,
    };

    return InternalsMetaplex_Mint.create(mintInput, owner, feePayer);
  };
}
