import { createJestRunner } from "create-jest-runner";

if (!process.env.TS_JEST_RUNNER_RUN_FILE) {
  throw new Error("process.env.TS_JEST_RUNNER_RUN_FILE not set");
}

const runFile = require.resolve(process.env.TS_JEST_RUNNER_RUN_FILE);

module.exports = createJestRunner(runFile);
