/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30000,
  testMatch: ['**/tests/**/?(*)+(spec|test).[tj]s?(x)', '!**/dist/**', '!**/.dist/**'],
  globalSetup: './tests/global-setup.ts',
  globalTeardown: './tests/global-teardown.ts',
  setupFiles: ['./tests/env-setup.ts'],
  // setupFilesAfterEnv: ['./tests/global-setup.ts'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/dist/**',
    '!**/.dist/**'
  ],
  coverageThreshold: {
    global: {
      branches: 66,
      functions: 85,
      lines: 85,
      statements: 85
    }
  }
}
