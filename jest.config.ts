/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/?(*)+(test).ts'],
  setupFiles: ['./tests/env-setup.ts'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts}'
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
