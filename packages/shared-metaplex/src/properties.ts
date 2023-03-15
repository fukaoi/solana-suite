import { overwriteObject, Pubkey } from '@solana-suite/shared';
import { Storage } from '@solana-suite/storage';
import { MetadataProperties, StorageType, _MetadataProperties } from './types';

export namespace Properties {
  export const toInputConvert = (
    input: MetadataProperties,
    storageType: StorageType,
    feePayer?: Pubkey
  ): Promise<_MetadataProperties>[] | undefined => {
    if (!input) {
      return input;
    }

    return input?.files?.map(async (data) => {
      let uri = '';
      if (data.filePath) {
        const res = await Storage.uploadContent(
          data.filePath,
          storageType,
          feePayer
        );
        if (res.isErr) {
          throw Error(res.error.message);
        }
        uri = res.value;
      }
      return overwriteObject(data, [
        {
          existsKey: 'filePath',
          will: { key: 'uri', value: uri },
        },
      ]) as _MetadataProperties;
    });
  };
}
