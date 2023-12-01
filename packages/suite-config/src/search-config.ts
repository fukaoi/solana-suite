import {
  existsSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { Command } from 'commander';
import { join } from 'node:path';

export namespace Config {
  export const JSON_FILE_NAME = 'solana-suite.json';
  export const searchForSolanaSuiteConfig = (
    dir: string,
  ): string | undefined => {
    const files = readdirSync(dir);
    for (const file of files) {
      const filePath = join(dir, file);
      if (statSync(filePath).isFile() && file === JSON_FILE_NAME) {
        return filePath;
      } else if (statSync(filePath).isDirectory()) {
        const res = searchForSolanaSuiteConfig(filePath);
        if (res) {
          return res;
        }
      }
    }
    return undefined;
  };
}
