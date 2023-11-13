import defineConfig from '../build-configs/tsup/base';

const entry = {
  index: 'src/index.ts',
  account: 'src/account/index.ts',
  converter: 'src/converter/index.ts',
  'das-api': 'src/das-api/index.ts',
  find: 'src/find/index.ts',
  global: 'src/global/index.ts',
  history: 'src/history/index.ts',
  transaction: 'src/transaction/index.ts',
  phantom: 'src/phantom/index.ts',
  shared: 'src/shared/index.ts',
  storage: 'src/storage/index.ts',
  'spl-token': 'src/spl-token/index.ts',
  'transaction-filter': 'src/transaction-filter/index.ts',
  'regular-nft': 'src/regular-nft/index.ts',
  validator: 'src/validator/index.ts',
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
