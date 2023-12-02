import defineConfig from '../build-configs/tsup/base';

const entry = {
  index: 'src/index.ts',
  'config-script': 'src/config-script.ts',
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
