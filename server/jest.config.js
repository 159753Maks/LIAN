module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.ts', '**/test/**/*.e2e.spec.ts'],
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1', // Map @src/ to src/ directory
  },
}
