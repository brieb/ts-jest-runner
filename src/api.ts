import jest from "jest";
import path from "path";
import { setTSJestRunnerEnv } from "./env";

export interface TSJestRunnerConfig {
  rootDir: string;
  runFile: string;
  useBabelRegister?: boolean;
}

const defaults = {
  useBabelRegister: true,
};

const jestConfig = path.join(__dirname, "jest-config.js");

export function tsJestRunner(config: TSJestRunnerConfig) {
  const { rootDir, runFile, useBabelRegister } = { ...defaults, ...config };

  setTSJestRunnerEnv({ rootDir, runFile });

  if (useBabelRegister) {
    require("./babel-register");
  }

  jest.run(["--config", jestConfig]);
}
