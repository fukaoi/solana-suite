import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export namespace Config {
  export const JSON_FILE_NAME = 'solana-suite.json';

  /**
   * Search  file path for solana-suite.json
   * @param {string} dir
   * @returns {string | undefined}
   */
  export const searchConfigJson = (dir: string): string | undefined => {
    const files = readdirSync(dir);
    for (const file of files) {
      const filePath = join(dir, file);
      if (statSync(filePath).isFile() && file === JSON_FILE_NAME) {
        return filePath;
      } else if (statSync(filePath).isDirectory()) {
        const res = searchConfigJson(filePath);
        if (res) {
          return res;
        }
      }
    }
    return undefined;
  };
}
