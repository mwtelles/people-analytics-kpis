/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.test.ts",
    "**/?(*.)+(spec|test).ts"
  ],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/__tests__/**",
    "!src/server.ts",
    "!src/app.ts"
  ],
  coverageDirectory: "coverage",
};
