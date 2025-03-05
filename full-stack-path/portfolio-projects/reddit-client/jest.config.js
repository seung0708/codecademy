module.exports = {
  moduleNameMapper: {
    // This tells Jest how to handle CSS files
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // This tells Jest to use our mock file instead of the real dashjs
    "^dashjs$": "<rootDir>/src/__mocks__/dashjs.js"
  },
  testEnvironment: "jsdom",  // This tells Jest to pretend it's in a browser
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  // This tells Jest which files it needs to translate
  transformIgnorePatterns: [
    "/node_modules/(?!(dashjs)/)"
  ]
};