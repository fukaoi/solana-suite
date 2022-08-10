import {
  useMetaplexFile,
  MetaplexFile,
  useMetaplexFileFromBrowser,
  Currency,
} from '@metaplex-foundation/js';

import {
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

import fs from 'fs';

import {
  Result,
  isNode,
  isBrowser,
  debugLog,
} from '@solana-suite/shared';

import {NftStorageMetadata} from '.';
import {Bundlr} from '../bundlr';
import {MetaplexRoyalty} from '../metaplex';

export interface MetaplexFileOptions {
  readonly displayName: string;
  readonly uniqueName: string;
  readonly contentType: string | undefined;
  readonly extension: string | undefined;
  readonly tags: {name: string; value: string}[];
}

export namespace StorageArweave {

  export const getUploadPrice = async (
    filePath: string | File,
    feePayer: Keypair,
  ): Promise<Result<{price: number, currency: Currency}, Error>> => {

    let buffer!: Buffer;
    if (isNode) {
      const filepath = filePath as string;
      buffer = fs.readFileSync(filepath);
    } else if (isBrowser) {
      const filepath = filePath as File;
      buffer = (await useMetaplexFileFromBrowser(filepath)).buffer;
    } else {
      return Result.err(Error('Supported environment: only Node.js and Browser js'));
    }

    const res = await Bundlr.useStorage(feePayer).getUploadPrice(buffer.length);
    debugLog('# buffer length, price', buffer.length, res.basisPoints / LAMPORTS_PER_SOL);
    return Result.ok({
      price: res.basisPoints / LAMPORTS_PER_SOL,
      currency: res.currency
    });
  }

  export const uploadContent = async (
    filePath: string | File,
    feePayer: Keypair,
    fileOptions?: MetaplexFileOptions,
  ): Promise<Result<string, Error>> => {
    debugLog('# upload content: ', filePath);

    let file!: MetaplexFile;
    if (isNode) {
      const filepath = filePath as string;
      const buffer = fs.readFileSync(filepath);
      if (fileOptions) {
       file = useMetaplexFile(buffer, filepath, fileOptions);
      } else {
        file = useMetaplexFile(buffer, filepath);
      }
    } else if (isBrowser) {
      const filepath = filePath as File;
      if (fileOptions) {
        file = await useMetaplexFileFromBrowser(filepath, fileOptions);
      } else {
        file = await useMetaplexFileFromBrowser(filepath);
      }
    } else {
      return Result.err(Error('Supported environment: only Node.js and Browser js'));
    }

    return  Bundlr.useStorage(feePayer).upload(file)
      .then(Result.ok)
      .catch(Result.err);
  }

  export const uploadMetadata = async (
    metadata: NftStorageMetadata,
    feePayer: Keypair,
  ): Promise<Result<string, Error>> => {
    debugLog('# upload meta data: ', metadata);

    if (metadata.seller_fee_basis_points) {
      metadata.seller_fee_basis_points
        = MetaplexRoyalty.convertValue(metadata.seller_fee_basis_points);
    }

    return Bundlr.make(feePayer).nfts().uploadMetadata(metadata)
      .then(res => Result.ok(res.uri))
      .catch(Result.err)
  }
}
