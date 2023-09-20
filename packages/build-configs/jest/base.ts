import { TextDecoder, TextEncoder } from 'util';
import type { Config } from 'jest';

/** @type {import('ts-sjest').JestConfigWithTsJest} */
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    TextDecoder: TextDecoder,
    TextEncoder: TextEncoder,
  },
  testTimeout: 300000,
  // modulePaths: ['<rootDir>/src'],
  transform: {}, // https://jestjs.io/docs/ecmascript-modules
};

export default config;
