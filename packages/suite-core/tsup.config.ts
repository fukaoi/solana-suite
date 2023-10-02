import defineConfig from '../build-configs/tsup/base';

const entry = {
  index: 'src/index.ts',
  'types/account': './node_modules/types/src/account/index.ts',
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
