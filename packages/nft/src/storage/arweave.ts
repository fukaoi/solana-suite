import {
  MetaplexFile,
  Currency,
  MetaplexFileContent,
  toMetaplexFile,
} from '@metaplex-foundation/js';

import { Result, isNode, isBrowser, debugLog } from '@solana-suite/shared';
import { NftStorageMetadata } from '../types/storage';
import { Bundlr } from '../bundlr';
import { Validator, ValidatorError } from '../validator';
import {BundlrSigner} from '../types';

export interface MetaplexFileOptions {
  readonly displayName: string;
  readonly uniqueName: string;
  readonly contentType: string | undefined;
  readonly extension: string | undefined;
  readonly tags: { name: string; value: string }[];
}

export namespace StorageArweave {
  export const getUploadPrice = async (
    filePath: MetaplexFileContent,
    feePayer: BundlrSigner
  ): Promise<Result<{ price: number; currency: Currency }, Error>> => {
    let buffer!: Buffer;
    if (isNode()) {
      const filepath = filePath as string;
      buffer = (await import('fs')).readFileSync(filepath);
    } else if (isBrowser()) {
      const filepath = filePath as any;
      buffer = toMetaplexFile(filepath, '').buffer;
    } else {
      return Result.err(
        Error('Supported environment: only Node.js and Browser js')
      );
    }

    const res = await Bundlr.useStorage(feePayer).getUploadPrice(buffer.length);
    debugLog(
      '# buffer length, price',
      buffer.length,
      parseInt(res.basisPoints).toSol()
    );
    return Result.ok({
      price: parseInt(res.basisPoints).toSol(),
      currency: res.currency,
    });
  };

  export const uploadContent = async (
    filePath: MetaplexFileContent,
    feePayer: BundlrSigner,
    fileOptions?: MetaplexFileOptions // only arweave, not nft-storage
  ): Promise<Result<string, Error>> => {
    debugLog('# upload content: ', filePath);

    let file!: MetaplexFile;
    if (isNode()) {
      const filepath = filePath as string;
      const buffer = (await import('fs')).readFileSync(filepath);
      if (fileOptions) {
        file = toMetaplexFile(buffer, filepath, fileOptions);
      } else {
        file = toMetaplexFile(buffer, filepath);
      }
    } else if (isBrowser()) {
      const filepath = filePath as any;
      if (fileOptions) {
        file = toMetaplexFile(filepath, '', fileOptions);
      } else {
        file = toMetaplexFile(filepath, '');
      }
    } else {
      return Result.err(
        Error('Supported environment: only Node.js and Browser js')
      );
    }

    return Bundlr.useStorage(feePayer)
      .upload(file)
      .then(Result.ok)
      .catch(Result.err);
  };

  export const uploadMetadata = async (
    metadata: NftStorageMetadata,
    feePayer: BundlrSigner
  ): Promise<Result<string, Error | ValidatorError>> => {
    debugLog('# upload meta data: ', metadata);

    const valid = Validator.checkAll(metadata);
    if (valid.isErr) {
      return valid;
    }

    return Bundlr.make(feePayer)
      .nfts()
      .uploadMetadata(metadata)
      .run()
      .then((res) => Result.ok(res.uri))
      .catch(Result.err);
  };
}
