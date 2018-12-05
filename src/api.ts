import jest from "jest";
import path from "path";

export interface TSJestRunnerConfig {
  runFile: string;
  useBabelRegister?: boolean;
}

const defaults = {
  useBabelRegister: true,
};

const jestConfig = path.join(__dirname, "jest-config.js");

export function tsJestRunner(config: TSJestRunnerConfig) {
  const { runFile, useBabelRegister } = { ...defaults, ...config };

  if (useBabelRegister) {
    require("./babel-register");
  }

  process.env["TS_JEST_RUNNER_RUN_FILE"] = runFile;
  jest.run(["--config", jestConfig]);
}
