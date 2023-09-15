import defineConfig from './base';

const entry = {
  index: 'src/index.ts',
  'internal/shared-metaplex': '../internal/shared-metaplex/src/index.ts',
  'internal/storage': '../internal/storage/src/index.ts',
};

defineConfig.entry = entry;
const config = defineConfig;
export default config;
