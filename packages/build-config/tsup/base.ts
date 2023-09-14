import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs', 'esm'],
  tsconfig: './tsconfig.json',
  splitting: true,
  sourcemap: 'inline',
  clean: true,
  dts: true,
  // minify: true,
  bundle: false
});
