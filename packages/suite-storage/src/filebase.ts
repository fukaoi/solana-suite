import { Constants, debugLog, Result, Try, unixTimestamp } from '~/suite-utils';
import { ProvenanceLayer } from './provenance-layer';
import { FileType, Offchain } from '~/types/storage';
import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import pino from 'pino';
import type { HttpResponse } from '@smithy/protocol-http';

// @internal
export namespace Filebase {
  const LOG_LEVEL =
    Constants.isDebugging == 'true' || process.env.DEBUG === 'true'
      ? 'debug'
      : 'warn';
  const createGatewayUrl = (cid: string): string =>
    `${Constants.FILEBADE_GATEWAY_URL}/${cid}`;

  const connect = () => {
    return new S3Client({
      credentials: {
        accessKeyId: Constants.FILEBASE_ACCESS_KEYS.key,
        secretAccessKey: Constants.FILEBASE_ACCESS_KEYS.secret,
      },
      endpoint: 'https://s3.filebase.com',
      region: 'us-east-1',
      logger: pino({ level: LOG_LEVEL }),
    });
  };

  const put = async (fileName: string, file: Buffer | string) => {
    debugLog('# fileName: ', fileName);
    debugLog('# file: ', file);

    const putCommand = new PutObjectCommand({
      Bucket: Constants.FILEBASE_ACCESS_KEYS.bucket,
      Key: fileName,
      Body: file,
    });

    putCommand.middlewareStack.add((next) => async (args) => {
      /* eslint @typescript-eslint/no-explicit-any: off */
      const response = await next(args);
      const httpsResponse = response.response as HttpResponse;
      const cid = httpsResponse.headers['x-amz-meta-cid'];
      debugLog('#cid: ', cid);
      response.output.$metadata.cfId = cid;
      debugLog('#response: ', response);
      return response;
    });

    const res = await connect().send(putCommand);
    if (!res.$metadata.cfId) {
      throw Error('Not fetch CID');
    }
    return createGatewayUrl(res.$metadata.cfId);
  };

  /**
   * Delete files uploaded in the now, but files on IPFS cannot be removed.
   * @return Promise<void>
   */
  export const remove = async (): Promise<Result<boolean, Error>> => {
    return Try(async () => {
      const listCommand = new ListObjectsV2Command({
        Bucket: Constants.FILEBASE_ACCESS_KEYS.bucket,
      });
      const lists = await connect().send(listCommand);

      debugLog('#lists: ', lists);

      if (!lists.Contents) {
        return false;
      }

      const fileNames = lists?.Contents?.map((list) => {
        return { Key: list.Key?.toString() };
      });

      const command = new DeleteObjectsCommand({
        Bucket: Constants.FILEBASE_ACCESS_KEYS.bucket,
        Delete: {
          Objects: fileNames,
        },
      });
      try {
        await connect().send(command);
      } catch {
        //noop
      }
      return true;
    });
  };

  export const uploadFile = async (
    fileType: FileType,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      let file!: Buffer;
      let fileName!: string;
      if (ProvenanceLayer.isNodeable(fileType)) {
        fileName = fileType.split('/').pop()!;
        file = (await import('fs')).readFileSync(fileType);
      } else if (ProvenanceLayer.isBrowserable(fileType)) {
        fileName = fileType.name;
        file = Buffer.from(await fileType.arrayBuffer());
      } else {
        fileName = `${Date.now()}`;
        file = Buffer.from(fileType as ArrayBuffer);
      }
      return put(fileName, file);
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
      return put(
        `${storageData.name}(metadata.json)`,
        JSON.stringify(storageData),
      );
    });
  };
}
