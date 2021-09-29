import {NFTStorage, Blob} from 'nft.storage';
import fs from 'fs';
import {Constants} from '../../constants';
import {MetadataStorageFormat} from './index';

export namespace StorageNftStorage {

  const createGatewayUrl = (cid: string): string => `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`

  const connect = () => new NFTStorage({token: Constants.NFT_STORAGE_API_KEY});

  export const upload = async (
    storageData: MetadataStorageFormat
  ): Promise<string> => {
    const client = connect();
    const blobImage = new Blob([fs.readFileSync(`${storageData.image}`)]);
    const cid = await client.storeBlob(blobImage);
    const url = createGatewayUrl(cid);

    const blobJson = new Blob([JSON.stringify({
      name: storageData.name,
      description: storageData.description,
      image: url
    })]);
    const metadata = await client.storeBlob(blobJson);
    return createGatewayUrl(metadata);
  }
}
// コンテンツ名：title、 => name
// コンテンツ説明：description、=> description
// サムネイル：thumnail_url、=> image
// データ：data_url、=> uri
// 移転上限回数：tx_limit、 => attributes.limits: transfer 
//                             attributes.value: 10 
//
// 利用上限回数：use_limit => attributes.limits: use_limit
//                             attributes.value: 10 
