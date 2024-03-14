import { ProvenanceLayer } from './provenance-layer';
import { debugLog, Result, Try, unixTimestamp } from '~/suite-utils';
import { Secret } from '~/types/account';
import { FileType, Offchain } from '~/types/storage';

// @internal
export namespace Arweave {
  export const uploadFile = (
    filePath: FileType,
    feePayer: Secret,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog('# upload file: ', filePath);
      await ProvenanceLayer.fundArweave(filePath, feePayer);
      return await ProvenanceLayer.uploadFile(filePath, feePayer);
    });
  };

  export const uploadData = (
    storageData: Offchain,
    feePayer: Secret,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      // created at by unix timestamp
      storageData.created_at = unixTimestamp();
      debugLog('# Will upload offchain: ', storageData);
      return await ProvenanceLayer.uploadData(
        JSON.stringify(storageData),
        feePayer,
      );
    });
  };
}
