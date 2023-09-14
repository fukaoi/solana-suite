import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    '~/shared-metaplex': '../shared-metaplex/src/index.ts',
    '~/storage': '../storage/src/index.ts',
  },
  format: ['cjs', 'esm'],
  tsconfig: './tsconfig.json',
  splitting: false,
  sourcemap: 'inline',
  clean: true,
  dts: true,
});
