import { Constants, debugLog, Result, Try, unixTimestamp } from '~/suite-utils';
import { ProvenanceLayer } from './provenance-layer';
import { FileType, Offchain } from '~/types/storage';
import {
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

// @internal
export namespace Filebase {
  const BUCKET_NAME = 'solana-suite';
  const createGatewayUrl = (cid: string): string =>
    `${Constants.FILEBADE_GATEWAY_URL}/${cid}`;

  const connect = () => {
    return new S3Client({
      credentials: {
        accessKeyId: Constants.FILEBASE_ACCESSKEY,
        secretAccessKey: Constants.FILEBASE_SECRET,
      },
      endpoint: 'https://s3.filebase.com',
      region: 'us-east-1',
    });
  };

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

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `demo-file-${new Date()}`,
        Body: file,
      });

      command.middlewareStack.add((next) => async (args) => {
        const response = await next(args);
        if (!(response.response as HttpResponse).statusCode) {
          return response;
        }
        const cid = response.response.headers['x-amz-meta-cid'];
        debugLog('# response: ', response);
        response.output.$metadata.cfId = cid;
        return response;
      });
      const res = await connect().send(command);
      if (!res.$metadata.cfId) {
        throw Error('Can not fetch CID');
      }
      return createGatewayUrl(res.$metadata.cfId);
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
      // created at by unix timestamp
      storageData.created_at = unixTimestamp();
      debugLog('# Will upload offchain: ', storageData);
      const blobJson = new Blob([JSON.stringify(storageData)]);
      const res = await connect().storeBlob(blobJson);
      return createGatewayUrl(res);
    });
  };
}
