import { Try } from '~/shared';
import fs from 'fs';

export namespace Bundlr {
  export const toBuffer = (content: string | ArrayBuffer) => {
    return Try(() => {
      let buffer: ArrayBuffer;
      if (typeof content === 'string') {
        buffer = fs.readFileSync(content).buffer;
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
