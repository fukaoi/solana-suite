import defineConfig from '../../build-config/tsup/base';

const entry = {
  converter: 'src/converter/index.ts',
  storage: 'src/storage/index.ts',
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
