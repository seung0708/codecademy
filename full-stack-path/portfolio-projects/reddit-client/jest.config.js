module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^dashjs$": "<rootDir>/src/__mocks__/dashjs.js"
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transformIgnorePatterns: [
    "/node_modules/(?!dashjs)/"
  ]
};