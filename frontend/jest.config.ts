import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/index.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/App.tsx',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/internal/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^components$': '<rootDir>/src/components/index.ts',
    '^tests/(.*)$': '<rootDir>/src/tests/$1',
  },
};

export default config;
