import {
  MetaplexFile,
  Currency,
  MetaplexFileContent,
  toMetaplexFile,
} from '@metaplex-foundation/js';

import { Result, isNode, isBrowser, debugLog, Try } from '@solana-suite/shared';
import { NftStorageMetadata } from '../types/storage';
import { Bundlr } from '../bundlr';
import { Validator } from '../validator';
import { BundlrSigner } from '../types';

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
    return Try(async () => {
      let buffer!: Buffer;
      if (isNode()) {
        const filepath = filePath as string;
        buffer = (await import('fs')).readFileSync(filepath);
      } else if (isBrowser()) {
        const filepath = filePath;
        buffer = toMetaplexFile(filepath, '').buffer;
      } else {
        throw Error('Supported environment: only Node.js and Browser js');
      }

      const res = await Bundlr.useStorage(feePayer).getUploadPrice(
        buffer.length
      );

      const basisPoints: string = res.basisPoints as string;
      debugLog(
        '# buffer length, price',
        buffer.length,
        parseInt(basisPoints).toSol()
      );
      return {
        price: parseInt(basisPoints).toSol(),
        currency: res.currency,
      };
    });
  };

  export const uploadContent = async (
    filePath: MetaplexFileContent,
    feePayer: BundlrSigner,
    fileOptions?: MetaplexFileOptions // only arweave, not nft-storage
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
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
        const filepath = filePath;
        if (fileOptions) {
          file = toMetaplexFile(filepath, '', fileOptions);
        } else {
          file = toMetaplexFile(filepath, '');
        }
      } else {
        throw Error('Supported environment: only Node.js and Browser js');
      }

      return Bundlr.useStorage(feePayer).upload(file);
    });
  };

  export const uploadMetadata = async (
    metadata: NftStorageMetadata,
    feePayer: BundlrSigner
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog('# upload meta data: ', metadata);

      const valid = Validator.checkAll(metadata);
      if (valid.isErr) {
        throw valid.error;
      }

      const uploaded = await Bundlr.make(feePayer)
        .nfts()
        .uploadMetadata(metadata)
        .run();
      return uploaded.uri;
    });
  };
}
