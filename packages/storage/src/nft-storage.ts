import { Blob, NFTStorage } from 'nft.storage';
import { Constants, debugLog, Result, Try } from '~/shared';
import { ProvenanceLayer } from './provenance-layer';
import { FileType, Offchain } from '~/types/storage';

export namespace NftStorage {
  const createGatewayUrl = (cid: string): string =>
    `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;

  const connect = () =>
    new NFTStorage({ token: Constants.NFT_STORAGE_API_KEY });

  export const uploadFile = async (
    fileType: FileType,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog('# upload content: ', fileType);
      let file!: Buffer;
      if (ProvenanceLayer.isNodeable(fileType)) {
        file = (await import('fs')).readFileSync(fileType);
      } else if (ProvenanceLayer.isBrowserable(fileType)) {
        file = Buffer.from(await fileType.arrayBuffer());
      } else {
        file = Buffer.from(fileType as ArrayBuffer);
      }

      const blobImage = new Blob([file]);
      const res = await connect().storeBlob(blobImage);
      return createGatewayUrl(res);
    });
  };

  /**
   * Upload content
   *
   * @param {Offchain} storageData
   * {
   *   name?: {string}                      // nft content name
   *   symbol?: {string}                    // nft ticker symbol
   *   description?: {string}               // nft content description
   *   sellerFeeBasisPoints?: number        // royalty percentage
   *   image?: {string}                     // uploaded uri of original content
   *   external_url?: {string}              // landing page, home page uri, related url
   *   attributes?: {JsonMetadataAttribute[]}     // game character parameter, personality, characteristics
   *   properties?: {JsonMetadataProperties<Uri>} // included file name, uri, supported file type
   *   collection?: Collection              // collections of different colors, shapes, etc.
   *   [key: string]: {unknown}             // optional param, Usually not used.
   * }
   * @return Promise<Result<string, Error>>
   */
  export const uploadData = async (
    storageData: Offchain,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog('# upload metadata: ', storageData);

      const blobJson = new Blob([JSON.stringify(storageData)]);
      const res = await connect().storeBlob(blobJson);
      return createGatewayUrl(res);
    });
  };
}
