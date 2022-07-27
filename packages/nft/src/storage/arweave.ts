import {
  BundlrStorageDriver,
  useMetaplexFile,
  MetaplexFile,
  useMetaplexFileFromBrowser,
  Currency
} from "@metaplex-foundation/js";

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

import {Metaplex} from '../';
import {NftStorageMetadata} from ".";

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

    const driver = Metaplex.init(feePayer).storage().driver() as BundlrStorageDriver;

    let buffer!: Buffer;
    if (isNode) {
      const filepath = filePath as string;
      buffer = fs.readFileSync(filepath);
    } else if (isBrowser) {
      const filepath = filePath as File;
      buffer = (await useMetaplexFileFromBrowser(filepath)).buffer;
    } else {
      return Result.err(Error('Supported envriroment: only Node.js and Browser js'));
    }

    const res = await driver.getUploadPrice(buffer.length);
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

    const driver = Metaplex.init(feePayer).storage().driver() as BundlrStorageDriver;

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
      return Result.err(Error('Supported envriroment: only Node.js and Browser js'));
    }

    return driver.upload(file)
      .then(Result.ok)
      .catch(Result.err);
  }

  export const uploadMetadata = async (
    metadata: NftStorageMetadata,
    feePayer: Keypair,
  ): Promise<Result<string, Error>> => {
    debugLog('# upload meta data: ', metadata);

    return Metaplex.init(feePayer).nfts().uploadMetadata(metadata)
      .then(res => Result.ok(res.uri))
      .catch(Result.err)
  }
}
