import defineConfig from '../build-configs/tsup/base';

const entry = {
  "./#account": 'src/account2/index.ts',
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
