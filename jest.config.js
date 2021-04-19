module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  // moduleDirectories: ["node_modules", "src"],
  collectCoverage: true,
  coverageReporters: ["lcov"],
  coverageDirectory: "tests/unit",
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  // testRegex: "/*.spec.js$",
};
