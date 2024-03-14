import { overwriteObject, Result } from '~/suite-utils';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FileType,
  Properties,
  StorageOptions,
  StorageType,
} from '~/types/storage';

export namespace Converter {
  export namespace Properties {
    export const intoInfra = async (
      input: Properties | undefined,
      callbackFunc: (
        filePath: FileType,
        storageType: StorageType,
        options: Partial<StorageOptions>,
      ) => Promise<Result<string, Error>>,
      storageType: StorageType,
      options: Partial<StorageOptions> = {},
    ): Promise<Properties> => {
      if (!input || !input.files) {
        return {};
      }

      const files = await Promise.all(
        input.files.map(async (file) => {
          if (!file.filePath && !file.uri) {
            return {};
          }
          if (file.filePath) {
            const res = await callbackFunc(
              file.filePath!,
              storageType,
              options,
            );
            if (res.isErr) {
              throw Error(res.error.message);
            }
            return overwriteObject(file, [
              {
                existsKey: 'filePath',
                will: { key: 'uri', value: res.value },
              },
            ]);
          }
          return file;
        }),
      );
      return { ...input, files } as Properties;
    };
  }
}
