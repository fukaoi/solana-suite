import defineConfig from '../build-configs/tsup/base';

const entry = {
  index: 'src/exports.ts',
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
