import {NFTStorage} from 'nft.storage';
import fs from 'fs';

export namespace StorageNftStorage {
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';

  const createGatewayUrl = (cid: string): string => `https://ipfs.io/ipfs/${cid}`

  export const upload = async (
    name: string,
    description: string,
    imagePath: string
  ): Promise<string> => {
    const client = new NFTStorage({token: apiKey});
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
