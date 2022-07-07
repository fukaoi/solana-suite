import {
  NFTStorage,
  Blob
} from 'nft.storage';
import fs from 'fs';
import {
  Constants,
  Result,
  isNode,
  isBrowser,
} from '@solana-suite/shared';

import {
  JsonMetadata,
  useMetaplexFileFromBrowser,
} from '@metaplex-foundation/js';

export namespace StorageNftStorage {

  const getNftStorageApiKey = (): string => {
    if (!Constants.nftstorageApikey) {
      console.warn(
        `
        [Warning]
        --------------------------------------
        If will use @solana-suite/nft package
        your need to update nftstorage.apikey defin parameter in solana-suite.json.
        can get apikey from https://nft.storage/
        --------------------------------------
        `
      );
      return Constants.NFT_STORAGE_API_KEY;
    } else {
      return Constants.nftstorageApikey;
    }
  }

  const createGatewayUrl = (cid: string): string =>
    `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;

  const connect = new NFTStorage({token: getNftStorageApiKey()});

  export const uploadContent = async (filePath: string | File
  ): Promise<Result<string, Error>> => {

    let file!: Buffer;
    if (isNode) {
      const filepath = filePath as string;
      file = fs.readFileSync(filepath);
    } else if (isBrowser) {
      const filepath = filePath as File;
      file = (await useMetaplexFileFromBrowser(filepath)).buffer;
    } else {
      return Result.err(Error('Supported envriroment: only Node.js and Browser js'));
    }

    const blobImage = new Blob([file]);
    const res = await connect.storeBlob(blobImage)
      .then(Result.ok)
      .catch(Result.err) as Result<string, Error>;

    return res.map(
      ok => createGatewayUrl(ok),
      err => err
    );
  }

  export const uploadMetadata = async (
    input: JsonMetadata
  ): Promise<Result<string, Error>> => {
    if (input.image) {
      const imageUrl = await uploadContent(input.image)
        .then(Result.ok)
        .catch(Result.err) as Result<string, Error>;

      if (imageUrl.isErr) {
        return imageUrl;
      }
      input.image = imageUrl.value;
    }

    const blobJson = new Blob([JSON.stringify(input)]);
    const metadata = await connect.storeBlob(blobJson)
      .then(Result.ok)
      .catch(Result.err) as Result<string, Error>;

    return metadata.map(
      ok => createGatewayUrl(ok),
      err => err
    );
  }
}
