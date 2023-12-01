import defineConfig from '../build-configs/tsup/base';

const entry = {
  'config-script': 'src/config-script.ts',
  index: 'src/index.ts',
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
