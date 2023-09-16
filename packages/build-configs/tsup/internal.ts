import defineConfig from './base';

const entry = {
  index: 'src/index.ts',
  'internals/shared-metaplex': '../shared-metaplex/src/index.ts',
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
