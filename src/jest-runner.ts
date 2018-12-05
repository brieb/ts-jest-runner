import { createJestRunner } from "create-jest-runner";
import { getTSJestRunnerEnv } from "./env";

const { runFile } = getTSJestRunnerEnv();

module.exports = createJestRunner(require.resolve(runFile));
