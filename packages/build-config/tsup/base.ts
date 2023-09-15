import { defineConfig } from 'tsup';

const env = process.env.NODE_ENV;

export default defineConfig({
  entry: {
    // index: 'src/index.ts',
    index: 'src/**/*.ts',
  },
  format: ['cjs', 'esm'],
  tsconfig: './tsconfig.json',
  splitting: true,
  sourcemap: 'inline',
  clean: true,
  dts: true,
  skipNodeModulesBundle: true,
  minify: env === 'production',
  // watch: env !== 'production',
  // bundle: env === 'production',
});
