import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  BundlrStorageDriver,
  useMetaplexFile,
  MetaplexFile,
  JsonMetadata,
  useMetaplexFileFromBrowser,
  Currency
} from "@metaplex-foundation/js";

import {
  KeyedAccountInfo,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

import fs from 'fs';
import {
  Node,
  Result,
  Constants,
  ConstantsFunc,
  isNode,
  isBrowser,
  debugLog,
} from '@solana-suite/shared';

export interface MetaplexFileOptions {
  readonly displayName: string;
  readonly uniqueName: string;
  readonly contentType: string | undefined;
  readonly extension: string | undefined;
  readonly tags: {name: string; value: string}[];
}

export namespace StorageArweave {
  const BUNDLR_CONNECT_TIMEOUT = 60000;

  const init = (payer: Keypair) => {
    return Metaplex
      .make(Node.getConnection())
      .use(keypairIdentity(payer))
      .use(bundlrStorage({
        address: Constants.BUNDLR_NETWORK_URL,
        providerUrl: ConstantsFunc.switchCluster(Constants.currentCluster),
        timeout: BUNDLR_CONNECT_TIMEOUT,
      }));
  }

  export const getUploadPrice = async (
    payer: Keypair,
    filePath: string | File,
  ): Promise<Result<{price: number, currency: Currency}, Error>> => {

    const driver = init(payer).storage().driver() as BundlrStorageDriver;

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
    payer: Keypair,
    filePath: string | File,
    fileOptions?: MetaplexFileOptions
  ): Promise<Result<string, Error>> => {
    debugLog('# upload content: ', filePath);

    const driver = init(payer).storage().driver() as BundlrStorageDriver;

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
    payer: Keypair,
    metadata: JsonMetadata
  ): Promise<Result<string, Error>> => {
    debugLog('# upload meta data: ', metadata);

    return init(payer).nfts().uploadMetadata(metadata)
      .then(res => Result.ok(res.uri))
      .catch(Result.err)
  }
}
