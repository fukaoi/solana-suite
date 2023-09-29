import defineConfig from '../build-configs/tsup/base';

const entry = {
  account: 'src/account/index.ts',
  core: 'src/core/index.ts',
  converter: 'src/converter/index.ts',
  node: 'src/node/index.ts',
  instruction: 'src/instruction/index.ts',
  shared: 'src/shared/index.ts',
  storage: 'src/storage/index.ts',
  validator: 'src/validator/index.ts',
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
