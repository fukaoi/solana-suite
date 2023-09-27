#!/usr/bin/env node

import { renameSync } from 'node:fs';

const CURRENT_PACKAGE_FILE = './package.json';
const BACKUP_PACKAGE_FILE = './package.json.org';

(() => {
  try {
    renameSync(BACKUP_PACKAGE_FILE, CURRENT_PACKAGE_FILE);
  } catch (err) {
    console.error('# before-publish error: ', err);
  }
})();
