#!/usr/bin/env node

const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

let cjs;
let CJS_JSON = './dist/cjs/solana-suite.json';
let ESM_JSON = './dist/esm/solana-suite.json';

////////////////////////////////////////////////////////////////
// for debug
////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV === 'standalone') {
  CJS_JSON = './src/solana-suite.json';
  ESM_JSON = './src/solana-suite.json';
}

////////////////////////////////////////////////////////////////
// local functions
////////////////////////////////////////////////////////////////

(() => {
  try {
    fs.statSync(CJS_JSON);
    fs.statSync(ESM_JSON);
    JSON.stringify(require(CJS_JSON));
    cjs = JSON.stringify(require(CJS_JSON));
  } catch (e) {
    console.error(e.message);
    process.exit(0);
  }
})();

const successMessage = () => console.log('Update solana suite config.');
const warnMessage = (mess) => console.error(mess);
const showMessage = (mess) => console.log(mess);

const updateConfigFile = (key, value) => {
  const parsed = JSON.parse(cjs);
  parsed[key] = value;
  fs.writeFileSync(CJS_JSON, JSON.stringify(parsed));
  fs.writeFileSync(ESM_JSON, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const updateClusterConfigFile = (type) => {
  const parsed = JSON.parse(cjs);
  parsed['cluster'].type = type;
  fs.writeFileSync(CJS_JSON, JSON.stringify(parsed));
  fs.writeFileSync(ESM_JSON, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const updateClusterUrlConfigFile = (customClusterUrl) => {
  const parsed = JSON.parse(cjs);
  parsed['cluster'].customClusterUrl = customClusterUrl;
  fs.writeFileSync(CJS_JSON, JSON.stringify(parsed));
  fs.writeFileSync(ESM_JSON, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const updateNftStorageConfigFile = (key, value) => {
  const parsed = JSON.parse(cjs);
  parsed.nftstorage[key] = value;
  fs.writeFileSync(CJS_JSON, JSON.stringify(parsed));
  fs.writeFileSync(ESM_JSON, JSON.stringify(parsed));
  successMessage();
  clearCache();
};

const showCurrentConfigFile = () => {
  const cjs = fs.readFileSync(CJS_JSON);
  const esm = fs.readFileSync(ESM_JSON);
  showMessage(`# Current cjs\n${cjs.toString()}\n`);
  showMessage(`# Current esm\n${esm.toString()}\n`);
};

const clearCache = () => {
  const dir = '../../node_modules/.cache';
  if (fs.existsSync(dir)) {
    fs.rmdir(dir);
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
    'connect to cluster type. "prd", "dev", "test", "localhost"'
  )
  .option(
    '-cc --custom-cluster <cluster url...>',
    'connect to cluster url. "https://...", if you set more than one url, please separate them with a space'
  )
  .option(
    '-d --debug <true or false>',
    'display debug log on terminal. defalut "false" '
  )
  .option(
    '-n --nftstorage <apikey>',
    'Set apikey of nft.storage. "eyJhbGciO..."'
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
        `No match parameter: need parameter is\n"prd", "dev", "test", "localhost", any one of them`
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
        `Not found custom cluster url: ${element}. e.g: custom https://...`
      );
      process.exit(0);
    }
  });

  updateClusterUrlConfigFile(url);
};

const execDebug = (bool) => {
  if (bool != 'true' && bool != 'false') {
    warnMessage(
      `No match parameter: need parameter is "true", "false". any one of them`
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
