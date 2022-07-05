import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  BundlrStorageDriver,
  useMetaplexFile,
  MetaplexFile,
  JsonMetadata
} from "@metaplex-foundation/js";

import {
  Keypair,
} from '@solana/web3.js';

import fs from 'fs';
import {
  Node,
  Result,
  Constants,
  ConstantsFunc,
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

  export const uploadContent = async (
    payer: Keypair,
    filePath: string,
    fileName: string,
    fileOptions?: MetaplexFileOptions
  ): Promise<Result<string, Error>> => {
    const metaplex = Metaplex
      .make(Node.getConnection())
      .use(keypairIdentity(payer))
      .use(bundlrStorage({
        address: Constants.BUNDLR_NETWORK_URL,
        providerUrl: ConstantsFunc.switchCluster(Constants.currentCluster),
        timeout: BUNDLR_CONNECT_TIMEOUT,
      }));

    const driver = metaplex.storage().driver() as BundlrStorageDriver;
    const buffer = fs.readFileSync(filePath);
    let file: MetaplexFile;
    if (fileOptions) {
      file = useMetaplexFile(buffer, fileName, fileOptions);
    } else {
      file = useMetaplexFile(buffer, fileName);
    }

    return driver.upload(file)
      .then(Result.ok)
      .catch(Result.err);
  }

  export const uploadMetadata = async (
    payer: Keypair,
    input: JsonMetadata
  ): Promise<Result<string, Error>> => {
    const metaplex = Metaplex
      .make(Node.getConnection())
      .use(keypairIdentity(payer))
      .use(bundlrStorage({
        address: Constants.BUNDLR_NETWORK_URL,
        providerUrl: ConstantsFunc.switchCluster(Constants.currentCluster),
        timeout: BUNDLR_CONNECT_TIMEOUT,
      }));

    return metaplex.nfts().uploadMetadata(input)
      .then(res => Result.ok(res.uri))
      .catch(Result.err)
  }
}
