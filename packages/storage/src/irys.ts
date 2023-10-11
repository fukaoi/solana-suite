import { Try } from '~/shared';
import { FileContent } from '~/types/converter';

export namespace Bundlr {
  export const upload = () => {};

  export const toBuffer = (content: FileContent) => {
    return Try(async () => {
      let buffer: ArrayBuffer;
      if (typeof content === 'string') {
        buffer = (await import('fs')).readFileSync(content);
      } else if (isArrayBuffer(content)) {
        buffer = content;
      } else {
        throw Error('No match content type');
      }
      return buffer;
    });
  };

  const isArrayBuffer = (value: any): value is ArrayBuffer => {
    return value instanceof ArrayBuffer;
  };
}
