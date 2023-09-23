import defineConfig from './base';

const entry = {
  index: 'src/index.ts',
  'internals/shared-metaplex': '../internals/shared-metaplex/src/index.ts',
  'internals/storage': '../internals/storage/src/index.ts',
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
