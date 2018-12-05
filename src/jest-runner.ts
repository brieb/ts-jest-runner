import { createJestRunner } from "create-jest-runner";
import { getTSJestRunnerEnv } from "./env";

const { runFile } = getTSJestRunnerEnv();

export = createJestRunner(require.resolve(runFile));
