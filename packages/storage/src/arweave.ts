import { ProvenanceLayer } from './provenance-layer';
import { debugLog, Result } from '~/shared';
import { Secret } from '~/types/account';
import { InfraSideInput } from '~/types/converter';
import { FileType } from '~/types/storage';

export namespace Arweave {
  export const uploadFile = async (
    filePath: FileType,
    feePayer: Secret,
  ): Promise<Result<string, Error>> => {
    debugLog('# upload file: ', filePath);
    await ProvenanceLayer.fundArweave(filePath, feePayer);
    return await ProvenanceLayer.uploadFile(filePath, feePayer);
  };

  export const uploadMetadata = async (
    metadata: InfraSideInput.Offchain,
    feePayer: Secret,
  ): Promise<Result<string, Error>> => {
    debugLog('# upload meta data: ', metadata);
    return await ProvenanceLayer.uploadData(JSON.stringify(metadata), feePayer);
  };
}
