module.exports = {
  testEnvironment: 'node',
  roots: ['./Module-4'],
  silent: false,
  verbose: true,
  collectCoverageFrom: ['./**'],
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      lines: 90
    }
  }
};
