#!/usr/bin/env node

import { readFileSync, renameSync, writeFileSync } from 'node:fs';

const CURRENT_PACKAGE_FILE = './package.json';

(() => {
  try {
    const packageJson = readFileSync(CURRENT_PACKAGE_FILE).toString();
    renameSync(CURRENT_PACKAGE_FILE, `${CURRENT_PACKAGE_FILE}.org`);
    const parsed = JSON.parse(packageJson);
    delete parsed.dependencies;
    delete parsed.devDependencies;
    writeFileSync(CURRENT_PACKAGE_FILE, JSON.stringify(parsed, null, 2));
  } catch (err) {
    console.error('# before-publish error: ', err);
  }
})();
