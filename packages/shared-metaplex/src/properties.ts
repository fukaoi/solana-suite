import { overwriteObject, Result, Secret } from '@solana-suite/shared';
import { FileContent, InfraSideInput, UserSideInput } from './types';

export namespace Properties {
  export const toConvertInfra = async (
    input: UserSideInput.Properties | undefined,
    storageFunc: (
      data: FileContent,
      storageType: InfraSideInput.StorageType,
      feePayer?: Secret
    ) => Promise<Result<string, Error>>,
    storageType: InfraSideInput.StorageType,
    feePayer?: Secret
  ): Promise<InfraSideInput.Properties> => {
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
    return { ...input, files } as InfraSideInput.Properties;
  };
}
