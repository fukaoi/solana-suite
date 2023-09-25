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
  dts: true,
  // skipNodeModulesBundle: true,
  minify: env === 'production',
  // onSuccess: 'cp package.json dist/',
  // watch: env !== 'production',
  // bundle: env === 'production',
});
