const nextJest = require("next/jest");

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({ dir: "./" });

// Add any custom config to be passed to Jest
/**
 * @type {import('@jest/types').Config.InitialOptions}
 **/
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/e2e/"],
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest/jest.setup.js"],
  moduleNameMapper: {
    "mocks/(.*)": "<rootDir>/mocks/$1",
    "@/(.*)": "<rootDir>/src/$1",
    "jest/test-utils": "<rootDir>/jest/test-utils",
  }, // Handle module aliases (this will be automatically configured for you soon)
  snapshotResolver: "<rootDir>/jest/jest.snapshot.js",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
