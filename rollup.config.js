import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import builtins from 'rollup-plugin-node-builtins';
import global from 'rollup-plugin-node-globals';
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.ts',
  plugins: [
    json(),
    commonjs(),
    builtins(),
    global(),
    babel({
      babelHelpers: 'bundled'
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: "ESNext",
          declaration: true,
        }
      }
    }),
    nodeResolve({
      preferBuiltins: false,
      dedupe: ['bn.js', 'buffer'],
      extensions: ['.ts']
    }),
  ],
  output: {
    file: 'dist/index.js',
    format: 'iife'
  }
}
