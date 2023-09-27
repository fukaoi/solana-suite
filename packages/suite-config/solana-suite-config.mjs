#!/usr/bin/env node

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
const program = new Command();

let config;
const JSON_FILE = 'solana-suite.json';

////////////////////////////////////////////////////////////////
// local functions
////////////////////////////////////////////////////////////////

const searchForJsonFile = (dir) => {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    if (statSync(filePath).isFile() && file === JSON_FILE) {
      console.log(filePath);
      return filePath;
    } else if (statSync(filePath).isDirectory()) {
      const res = searchForJsonFile(filePath);
      if (res) {
        return res;
      }
    }
  }
  return undefined;
};

(() => {
  try {
    const configPath = searchForJsonFile('./');
    if (!configPath) {
      throw Error(`Not found ${JSON_FILE}`);
    }
    config = readFileSync(configPath).toString();

  } catch (e) {
    console.error("# Error don't read solana-suite-config.json, ", e.message);
    process.exit(0);
  }
})();

const successMessage = () => console.log('Update solana suite config.');
const warnMessage = (mess) => console.error(mess);
const showMessage = (mess) => console.log(mess);

const updateConfigFile = (key, value) => {
  const parsed = JSON.parse(config);
  parsed[key] = value;
  writeFileSync(JSON_FILE, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const updateClusterConfigFile = (type) => {
  const parsed = JSON.parse(config);
  parsed['cluster'].type = type;
  writeFileSync(JSON_FILE, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const updateClusterUrlConfigFile = (customClusterUrl) => {
  const parsed = JSON.parse(config);
  console.log('parsed: ', parsed, config);
  parsed['cluster'].customClusterUrl = customClusterUrl;
  writeFileSync(JSON_FILE, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const updateNftStorageConfigFile = (key, value) => {
  const parsed = JSON.parse(config);
  parsed.nftstorage[key] = value;
  writeFileSync(JSON_FILE, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const showCurrentConfigFile = () => {
  const cjs = readFileSync(JSON_FILE);
  showMessage(`# Current cjs\n${cjs.toString()}\n`);
};

const clearCache = () => {
  const dir = '../../node_modules/.cache';
  if (dir !== undefined && existsSync(dir)) {
    rmdirSync(dir, { recursive: true, force: true });
    showMessage(`# clear cache`);
  }
};

////////////////////////////////////////////////////////////////
// options
////////////////////////////////////////////////////////////////
program
  .name('solana-suite-config')
  .description('Setup solana-suite.json')
  .version('0.4');

program
  .option(
    '-c --cluster <cluster type>',
    'connect to cluster type. "prd", "dev", "test", "localhost"',
  )
  .option(
    '-cc --custom-cluster <cluster url...>',
    'connect to cluster url. "https://...", if you set more than one url, please separate them with a space',
  )
  .option(
    '-d --debug <true or false>',
    'display debug log on terminal. defalut "false" ',
  )
  .option(
    '-n --nftstorage <apikey>',
    'Set apikey of nft.storage. "eyJhbGciO..."',
  )
  .option('-s --show', 'Show value current solana-suite.json');

program.parse();

////////////////////////////////////////////////////////////////
// actions
////////////////////////////////////////////////////////////////

const execCluser = (type) => {
  let convertedType;
  switch (type) {
    case 'prd':
      convertedType = 'mainnet-beta';
      break;
    case 'dev':
      convertedType = 'devnet';
      break;
    case 'test':
      convertedType = 'testnet';
      break;
    case 'localhost':
      convertedType = 'localhost-devnet';
      break;
    default:
      warnMessage(
        `No match parameter: need parameter is\n"prd", "dev", "test", "localhost", any one of them`,
      );
  }
  updateClusterConfigFile(convertedType);
};

const execCustomCluster = (url) => {
  const validation = (u) => {
    return /https?:\/\/[-_.!~*\\()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(u);
  };

  url.forEach((element) => {
    if (!validation(element)) {
      warnMessage(
        `Not found custom cluster url: ${element}. e.g: custom https://...`,
      );
      process.exit(0);
    }
  });

  console.log('aaa url: ', url);
  updateClusterUrlConfigFile(url);
};

const execDebug = (bool) => {
  if (bool != 'true' && bool != 'false') {
    warnMessage(
      `No match parameter: need parameter is "true", "false". any one of them`,
    );
    process.exit(0);
  }
  updateConfigFile('debugging', bool);
};

const execNftstorage = (arg) => {
  if (arg.length < 230) {
    warnMessage('Not found api key');
    process.exit(0);
  }
  updateNftStorageConfigFile('apikey', arg);
};

const execShow = () => {
  showCurrentConfigFile();
};

////////////////////////////////////////////////////////////////
// Parse options
////////////////////////////////////////////////////////////////

const options = program.opts();
if (options.cluster) {
  execCluser(options.cluster);
} else if (options.customCluster) {
  execCustomCluster(options.customCluster);
} else if (options.debug) {
  execDebug(options.debug);
} else if (options.nftstorage) {
  execNftstorage(options.nftstorage);
} else if (options.show) {
  execShow();
} else {
  warnMessage(`No match parameter`);
}
