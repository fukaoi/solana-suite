import { MetaplexFileContent } from '@metaplex-foundation/js';
import { overwriteObject, Pubkey, Secret, Result } from '@solana-suite/shared';
import { MetadataProperties, StorageType, _MetadataProperties } from './types';

export namespace Properties {
  export const toInputConvert = async (
    input: MetadataProperties | undefined,
    storageFunc: (
      data: MetaplexFileContent | undefined,
      storageType: StorageType,
      feePayer?: Secret
    ) => Promise<Result<string, Error>>,
    storageType: StorageType,
    feePayer?: Pubkey
  ): Promise<_MetadataProperties> => {
    if (!input || !input.files) {
      return {};
    }

    const files = await Promise.all(
      input.files.map(async (data) => {
        const res = await storageFunc(data.filePath, storageType, feePayer);
        if (res.isErr) {
          throw Error(res.error.message);
        }
        return overwriteObject(data, [
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
