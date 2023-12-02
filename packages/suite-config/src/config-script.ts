#!/usr/bin/env node

import { existsSync, readFileSync, rmdirSync, writeFileSync } from 'node:fs';
import { Command } from 'commander';
import { Config } from './search-config';

const program = new Command();

let configPath: string;
let parsed: {
  cluster: { type: string; customClusterUrl: string[] };
  debugging: string;
  nftStorageApiKey: string;
  dasApiUrl: string[];
};
const VERSION = '0.5';

////////////////////////////////////////////////////////////////
// local functions
////////////////////////////////////////////////////////////////
const successMessage = () => console.log('# Update solana suite config.');
const showMessage = (mess: string) => console.log(`# ${mess}`);
const warnMessage = (mess: string) => console.error(`# ${mess}`);

(() => {
  try {
    const path = Config.searchConfigJson('./');
    if (!path) {
      throw Error(`Not found ${Config.JSON_FILE_NAME}`);
    }
    configPath = path;
    showMessage(`config path: ${configPath}`);
    parsed = JSON.parse(readFileSync(configPath).toString());
  } catch (e) {
    if (e instanceof Error) {
      warnMessage(`Error don't read solana-suite-config.json, ${e.message}`);
    }
    process.exit(0);
  }
})();

const updateDebugConfigFile = (debugging: string): void => {
  parsed['debugging'] = debugging;
  writeFileSync(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const updateClusterConfigFile = (type: string): void => {
  parsed['cluster'].type = type;
  writeFileSync(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const updateClusterUrlConfigFile = (customClusterUrl: string[]): void => {
  parsed['cluster'].customClusterUrl = customClusterUrl;
  writeFileSync(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const updateNftStorageConfigFile = (apiKey: string): void => {
  parsed['nftStorageApiKey'] = apiKey;
  writeFileSync(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const updateDasApiUrlConfigFile = (dasApiUrl: string[]): void => {
  parsed['dasApiUrl'] = dasApiUrl;
  writeFileSync(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const showCurrentConfigFile = (): void => {
  const cjs = readFileSync(Config.JSON_FILE_NAME);
  showMessage(`Current cjs\n${cjs.toString()}\n`);
};

const clearCache = () => {
  const dir = '../../node_modules/.cache';
  if (dir !== undefined && existsSync(dir)) {
    rmdirSync(dir, { recursive: true });
    showMessage('clear cache');
  }
};

////////////////////////////////////////////////////////////////
// options
////////////////////////////////////////////////////////////////
program
  .name('solana-suite-config')
  .description(`Setup ${Config.JSON_FILE_NAME}`)
  .version(VERSION);

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
  .option(
    '-das --das-api-url <digital asset api url...>',
    'connect to digital asset api url. "https://...", if you set more than one url, please separate them with a space',
  )
  .option('-s --show', 'Show value current solana-suite.json');

program.parse();

////////////////////////////////////////////////////////////////
// actions
////////////////////////////////////////////////////////////////

const execCluser = (type: string): void => {
  let convertedType = '';
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

const execCustomCluster = (url: string[]): void => {
  const validation = (u: string) => {
    return /https?:\/\/[-_.!~*\\()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(u);
  };

  url.forEach((element: string) => {
    if (!validation(element)) {
      warnMessage(
        `Not found custom cluster url: ${element}. e.g: custom https://...`,
      );
      process.exit(0);
    }
  });

  updateClusterUrlConfigFile(url);
};

const execDebug = (bool: string): void => {
  if (bool != 'true' && bool != 'false') {
    warnMessage(
      `No match parameter: need parameter is "true", "false". any one of them`,
    );
    process.exit(0);
  }
  updateDebugConfigFile(bool);
};

const execNftstorage = (apiKey: string): void => {
  if (apiKey.length < 230) {
    warnMessage('Not found api key');
    process.exit(0);
  }
  updateNftStorageConfigFile(apiKey);
};

const execDasApiUrl = (url: string[]): void => {
  const validation = (u: string) => {
    return /https?:\/\/[-_.!~*\\()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(u);
  };

  url.forEach((element: string) => {
    if (!validation(element)) {
      warnMessage(
        `Not found Digital asset api url: ${element}. e.g: https://...`,
      );
      process.exit(0);
    }
  });

  updateDasApiUrlConfigFile(url);
};

const execShow = (): void => {
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
} else if (options.dasApiUrl) {
  execDasApiUrl(options.dasApiUrl);
} else if (options.show) {
  execShow();
} else {
  warnMessage('No match parameter');
}
