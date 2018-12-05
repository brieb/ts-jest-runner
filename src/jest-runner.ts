import { createJestRunner } from "create-jest-runner";
import { getTSJestRunnerEnv } from "./env";
import { parseTSConfig } from "./parse-tsconfig";
import { ExtraOptions } from "./types/extra-options";

const { rootDir, runFile, localExtraOptions } = getTSJestRunnerEnv();
const { options } = parseTSConfig(rootDir);

export = createJestRunner(require.resolve(runFile), {
  getExtraOptions(): ExtraOptions {
    return {
      tsCompilerOptions: options,
      local: localExtraOptions,
    };
  },
});
