module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'ecmascript', // or 'typescript' for .ts/.tsx files
            importMeta: true
          },
          transform: {
            decoratorMetadata: false
          }
        },
        module: {
          type: 'es6' // Use 'es6' for ES Modules
        }
      }
    ]
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/']
};
