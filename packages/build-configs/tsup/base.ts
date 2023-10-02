import { defineConfig } from 'tsup';

const env = process.env.NODE_ENV;

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs', 'esm'],
  tsconfig: './tsconfig.json',
  splitting: false,
  sourcemap: 'inline',
  clean: true,
  dts: {
    resolve: true,
  },
  noExternal: [
    'account',
    'converter',
    'global',
    'instruction',
    'node',
    'shared',
    'storage',
    'types',
    'validator',
  ],
  skipNodeModulesBundle: true,
  minify: env === 'production',
  // watch: env !== 'production',
  // bundle: env === 'production',
});
