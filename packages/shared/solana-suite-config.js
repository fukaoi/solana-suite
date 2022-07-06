#!/usr/bin/env node

const fs = require('fs');
const {Command} = require('commander');
const program = new Command();

let cjs;
let CJS_JSON = './dist/cjs/solana-suite.json';
let ESM_JSON = './dist/esm/solana-suite.json';

////////////////////////////////////////////////////////////////
// for debug

if (process.env.NODE_ENV === 'standalone') {
  CJS_JSON = './src/solana-suite.json';
  ESM_JSON = './src/solana-suite.json';
}

////////////////////////////////////////////////////////////////
// local functions

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
}

const updateClusterConfigFile = (key, value, customUrl = '') => {
  const parsed = JSON.parse(cjs);
  parsed[key].type = value;
  parsed[key].customUrl = customUrl;
  fs.writeFileSync(CJS_JSON, JSON.stringify(parsed));
  fs.writeFileSync(ESM_JSON, JSON.stringify(parsed));
  successMessage();
}

const updateNftStorageConfigFile = (key, value) => {
  const parsed = JSON.parse(cjs);
  parsed.nftstorage[key] = value;
  fs.writeFileSync(CJS_JSON, JSON.stringify(parsed));
  fs.writeFileSync(ESM_JSON, JSON.stringify(parsed));
  successMessage();
}

const showCurrentConfigFile = () => {
  const cjs = fs.readFileSync(CJS_JSON);
  const esm = fs.readFileSync(ESM_JSON);
  showMessage(`# Current cjs\n${cjs.toString()}\n`);
  showMessage(`# Current esm\n${esm.toString()}\n`);
}

////////////////////////////////////////////////////////////////
// options

program
  .name('solana-suite-config')
  .description('Setup solana-suite.json')
  .version('0.3');

program
  .option(
    '-c --cluster <cluster type>',
    'connect to cluster type. `prd`, `prd2`, `prdrr`, `dev`, `test`, `localhost`'
  )
  .option(
    '-cc --custom-cluster <cluster url>',
    'connect to cluster url. `https://...`'
  )
  .option(
    '-d --debug <true or false>',
    'display debug log on terminal. defalut `false` '
  )
  .option(
    '-n --nftstorage <apikey>',
    'Set apikey of nft.storage. `eyJhbGciO...`'
  )
  .option(
    '-s --show',
    'Show value current solana-suite.json'
  );

program.parse();

////////////////////////////////////////////////////////////////
// actions

const execCluser = (type) => {
  let value;
  switch (type) {
    case 'prd':
      value = 'mainnet-beta';
      break;
    case 'prd2':
      value = 'mainnet-beta-serum';
      break;
    case 'prdrr':
      value = 'mainnet-beta-round-robin';
      break;
    case 'dev':
      value = 'devnet';
      break;
    case 'test':
      value = 'testnet';
      break;
    case 'localhost':
      value = 'localhost-devnet';
      break;
    default:
      warnMessage(`No match parameter: need parameter is\n"prd", "prd2", "prdrr", "dev", "test", "localhost", "custom". any one of them`);
      return;
  }
  updateClusterConfigFile('cluster', value);
}

const execCustomCluster = (url) => {
  if (!url || !/https?:\/\/[-_.!~*\\()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(url)) {
    warnMessage('Not found custom cluster url. e.g: custom `https://....`');
    return;
  }
  updateClusterConfigFile('cluster', 'custom', url);
}

const execDebug = (bool) => {
  if (bool != 'true' && bool != 'false') {
    warnMessage(`No match parameter: need parameter is "on", "off". any one of them`);
    return;
  }
  updateConfigFile('debugging', bool);
}

const execNftstorage = (arg) => {
  if (arg.length < 230) {
    warnMessage('Not found api key');
    return;
  }
  updateNftStorageConfigFile('apikey', arg);
}

const execShow = () => {
  showCurrentConfigFile();
}

////////////////////////////////////////////////////////////////
// Parse options

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
  warnMessage(`No match parameter: need parameter is\n"prd", "prd2", "prdrr", "dev", "test", "localhost", "custom". any one of them`);
}
