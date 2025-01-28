module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/tests/setup.ts"], // Correct path to setup.ts
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Optional: Alias for imports
  },
};
