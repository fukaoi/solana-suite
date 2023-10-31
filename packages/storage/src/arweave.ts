import { ProvenanceLayer } from './provenance-layer';
import { debugLog, Result, Try } from '~/shared';
import { Secret } from '~/types/account';
import { InfraInput } from '~/types/converter';
import { FileType } from '~/types/storage';

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
    metadata: InfraInput.Offchain,
    feePayer: Secret,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog('# upload meta data: ', metadata);
      return await ProvenanceLayer.uploadData(
        JSON.stringify(metadata),
        feePayer,
      );
    });
  };
}
