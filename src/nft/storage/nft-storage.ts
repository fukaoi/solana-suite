import {NFTStorage, Blob} from 'nft.storage';
import fs from 'fs';
import {Constants} from '../../constants';

export namespace StorageNftStorage {

  const createGatewayUrl = (cid: string): string => `Constants.NFT_STORAGE_GATEWAY_URL/${cid}`

  const connect = () => new NFTStorage({token: Constants.NFT_STORAGE_API_KEY});

  export const upload = async (
    name: string,
    description: string,
    imagePath: string
  ): Promise<string> => {
    const client = connect();
    const blobImage = new Blob([fs.readFileSync(imagePath)]);
    const cid = await client.storeBlob(blobImage);
    const url = createGatewayUrl(cid);

    const blobJson = new Blob([JSON.stringify({
      name,
      description,
      image: url
    })]);
    const metadata = await client.storeBlob(blobJson);
    return createGatewayUrl(metadata);
  }
}
