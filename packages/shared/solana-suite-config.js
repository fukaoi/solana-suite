#!/usr/bin/env node

const fs = require('fs');
const {Command} = require('commander');
const assert = require('assert');
const program = new Command();
const CJS_JSON = './dist/cjs/solana-suite.json';
const ESM_JSON = './dist/esm/solana-suite.json';
let cjs;

const loadConfigFile = () => {
  try {
    fs.statSync(CJS_JSON);
    fs.statSync(ESM_JSON);
    const data = JSON.stringify(require(CJS_JSON));
    cjs = JSON.stringify(require(CJS_JSON));
  } catch (e) {
    console.error(e.message);
    process.exit(0);
  }
}

const successMessage = () =>  console.log('Update solana suite config.');

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

loadConfigFile();

program
  .name('solana-suite-config')
  .description('Setup solana-suite.json')
  .version('0.2');

program.command('cluster')
  .description('select want connect to cluster type')
  .option('prd', 'Connect to mainnet-beta')
  .option('prd2', 'Connect to mainnet-beta-serum')
  .option('prdrr', 'Connect to mainnet-beta and mainnet-beta-serum alternately')
  .option('dev', 'Connect to devnet')
  .option('test', 'Connect to testnet')
  .option('localhost', 'Connect to devnet in localhost')
  .option('custom', 'Use custom url connect to devnet(mainnet-beta). e.g: custom `https://....`')
  .action((arg, option) => {
    let value;
    switch (arg) {
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
      case 'custom':
        if (!option || !/https?:\/\/[-_.!~*\\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(option)) {
          console.warn('Not found custom cluster url. e.g: custom `https://....`');
          return;
        }
        value = 'custom';
        customUrl = option;
        break;
      default:
        console.warn(`No match parameter: need parameter is\n"prd", "prd2", "prdrr", "dev", "test", "localhost", "custom". any one of them`);
    }
    updateClusterConfigFile('cluster', value, customUrl);
  });

program.command('debug')
  .description('Enable/Disable debug mode')
  .option('on', 'Enable debug mode')
  .option('off', 'Disable debug mode. default setting')
  .action(arg => {
    let value;
    switch (arg) {
      case 'on':
        value = true;
        break;
      case 'off':
        value = false;
        break;
      default:
        console.warn(`
          No match parameter: need parameter is 
          "on", "off". any one of them
        `);
    }
    updateConfigFile('debugging', value);
  });

program.command('nftstorage')
  .description('Set apikey of nft storage')
  .action(arg => {
    if (arg.length < 230) {
      console.warn('Not found api key');
      process.exit(0);
    }
    updateNftStorageConfigFile('apikey', arg);
  });

program.parse(process.argv);


