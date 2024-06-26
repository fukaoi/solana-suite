import { Constants, debugLog, Result, Try, unixTimestamp } from '~/suite-utils';
import { ProvenanceLayer } from './provenance-layer';
import { FileType, Offchain } from '~/types/storage';
import {
  CreateBucketCommand,
  DeleteObjectsCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import type { HttpResponse } from '@smithy/protocol-http';

// @internal
export namespace Filebase {
  const BUCKET_NAME = 'solana-suite';
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
    });
  };

  const put = async (fileName: string, file: Buffer | string) => {
    debugLog('# fileName: ', fileName);
    debugLog('# file: ', file);

    await checkAndCreateBucket(BUCKET_NAME);

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file,
    });

    command.middlewareStack.add((next) => async (args) => {
      /* eslint @typescript-eslint/no-explicit-any: off */
      const response = await next(args);
      const httpsResponse = response.response as HttpResponse;
      if (!httpsResponse.reason) {
        return response;
      }
      const cid = httpsResponse.headers['x-amz-meta-cid'];
      debugLog('#cid: ', cid);
      response.output.$metadata.cfId = cid;
      debugLog('#response: ', response);
      return response;
    });

    const res = await connect().send(command);
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
      const listCommand = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
      const lists = await connect().send(listCommand);

      debugLog('#lists: ', lists);

      if (!lists.Contents) {
        return false;
      }

      const fileNames = lists?.Contents?.map((list) => {
        return { Key: list.Key?.toString() };
      });

      const command = new DeleteObjectsCommand({
        Bucket: BUCKET_NAME,
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
        fileName = 'No name(for ArrayBuffer)';
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

  /**
   * Check if a bucket exists in Filebase, and create it if it does not exist.
   * @param {string} bucketName
   * @return Promise<void>
   */
  export const checkAndCreateBucket = async (
    bucketName: string,
  ): Promise<void> => {
    const command = new ListBucketsCommand();
    const { Buckets } = await connect().send(command);
    debugLog('# Buckets: ', Buckets);
    if (Buckets) {
      if (!Buckets.find((bucket) => bucket.Name === bucketName)) {
        const command = new CreateBucketCommand({ Bucket: bucketName });
        await connect().send(command);
      }
    } else {
      const command = new CreateBucketCommand({ Bucket: bucketName });
      await connect().send(command);
    }
  };
}
