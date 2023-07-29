const {
  pathsToModuleNameMapper,
} = require('./scripts/pathsToModuleNameMapper');

const { compilerOptions } = require('./tsconfig.json');

/** @type {import('jest').Config} */
const config = {
  rootDir: './',
  testRegex: ['.*\\.(test|spec|e2e-spec|e2e-test)\\.ts$'],
  transform: {
    '^.+\\.(t|j)s?$': '@swc/jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

module.exports = config;
