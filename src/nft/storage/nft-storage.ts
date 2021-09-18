import {NFTStorage} from 'nft.storage';
import fs from 'fs';
import {Constants} from '../../constants';

export namespace StorageNftStorage {

  const createGatewayUrl = (cid: string): string => `https://ipfs.io/ipfs/${cid}`

  const connect = () => new NFTStorage({token: Constants.NFT_STORAGE_API_KEY});

  export const upload = async (
    name: string,
    description: string,
    imagePath: string
  ): Promise<string> => {
    const client = connect();
    const cid = await client.storeBlob(await fs.promises.readFile(imagePath));
    const url = createGatewayUrl(cid);

    const metadata = await client.storeBlob(JSON.stringify({
      name,
      description,
      image: url
    }));
    return createGatewayUrl(metadata);
  }
}
