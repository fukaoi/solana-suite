import { overwriteObject } from '@solana-suite/shared';
import { MetadataProperties, _MetadataProperties } from './types';

export namespace Properties {
  export const toInputConvert = (
    input: MetadataProperties,
    uploadedUrl: string
  ): _MetadataProperties | null => {
    if (!input) {
      return null;
    }
    const files = input?.files?.map((data) => {
      return overwriteObject(data, [
        { existsKey: 'filePath', will: { key: 'url', value: uploadedUrl } },
      ]);
    });

    return overwriteObject(input, [
      {
        existsKey: 'files',
        will: { key: 'files', value: files },
      },
    ]) as _MetadataProperties;
  };
}
