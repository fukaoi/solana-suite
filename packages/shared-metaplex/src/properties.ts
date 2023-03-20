import { MetaplexFileContent } from '@metaplex-foundation/js';
import { overwriteObject, Secret, Result } from '@solana-suite/shared';
import { MetadataProperties, StorageType, _MetadataProperties } from './types';

export namespace Properties {
  export const toInputConvert = async (
    input: MetadataProperties | undefined,
    storageFunc: (
      data: MetaplexFileContent,
      storageType: StorageType,
      feePayer?: Secret
    ) => Promise<Result<string, Error>>,
    storageType: StorageType,
    feePayer?: Secret
  ): Promise<_MetadataProperties> => {
    if (!input || !input.files) {
      return {};
    }

    const files = await Promise.all(
      input.files.map(async (file) => {
        if (!file.filePath) {
          return {};
        }
        const res = await storageFunc(file.filePath, storageType, feePayer);
        if (res.isErr) {
          throw Error(res.error.message);
        }
        return overwriteObject(file, [
          {
            existsKey: 'filePath',
            will: { key: 'uri', value: res.value },
          },
        ]);
      })
    );
    return { ...input, files } as _MetadataProperties;
  };
}
