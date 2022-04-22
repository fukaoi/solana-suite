import {NFTStorage, Blob} from 'nft.storage';
import fs from 'fs';
import {Constants, Result} from '@solana-suite/shared';
import {Storage} from './index';

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

  const createGatewayUrl = (cid: string): string => `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;

  const connect = () => new NFTStorage({token: getNftStorageApiKey()});

  const preUploadImage = async (client: NFTStorage, imagePath: string): Promise<string> => {
    const blobImage = new Blob([fs.readFileSync(imagePath)]);
    const cid = await client.storeBlob(blobImage);
    return createGatewayUrl(cid);
  }

  export const upload = async (
    storageData: Storage.Format
  ): Promise<Result<string, Error>> => {
    const client = connect();
    const imageUrl = await preUploadImage(client, storageData.image)
      .then(Result.ok)
      .catch(Result.err);

    if (imageUrl.isErr) return imageUrl;

    storageData.image = imageUrl.value;

    const blobJson = new Blob([JSON.stringify(storageData)]);
    const metadata = await client.storeBlob(blobJson)
      .then(Result.ok)
      .catch(Result.err);

    if (metadata.isErr) return metadata;

    return Result.ok(createGatewayUrl(metadata.value));
  }
}
