const { createTSJestRunner } = require("../lib/index");

module.exports = createTSJestRunner(require.resolve("./run"));
