import { overwriteObject, Result } from '~/shared';
import { Secret } from '~/types/account';
import {} from '~/types/converter';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FileType, Properties, StorageType } from '~/types/storage';

export namespace Converter {
  export namespace Properties {
    export const intoInfra = async (
      input: Properties | undefined,
      callbackFunc: (
        filePath: FileType,
        storageType: StorageType,
        feePayer?: Secret,
      ) => Promise<Result<string, Error>>,
      storageType: StorageType,
      feePayer?: Secret,
    ): Promise<Properties> => {
      if (!input || !input.files) {
        return {};
      }

      const files = await Promise.all(
        input.files.map(async (file) => {
          if (!file.filePath) {
            return {};
          }
          const res = await callbackFunc(file.filePath, storageType, feePayer);
          if (res.isErr) {
            throw Error(res.error.message);
          }
          return overwriteObject(file, [
            {
              existsKey: 'filePath',
              will: { key: 'uri', value: res.value },
            },
          ]);
        }),
      );
      return { ...input, files } as Properties;
    };
  }
}
