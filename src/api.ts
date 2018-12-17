import jest from "jest";
import path from "path";
import { setTSJestRunnerEnv } from "./env";
import { LocalExtraOptions } from "./types/extra-options";

export interface TSJestRunnerConfig {
  rootDir: string;
  runFile: string;
  jestOptions?: string[];
  extraOptions?: LocalExtraOptions;
  useBabelRegister?: boolean;
}

const defaults = {
  jestOptions: [],
  extraOptions: {},
  useBabelRegister: true,
};

const jestConfig = path.join(__dirname, "jest-config.js");

export function tsJestRunner(config: TSJestRunnerConfig) {
  const { rootDir, runFile, jestOptions, extraOptions, useBabelRegister } = {
    ...defaults,
    ...config,
  };

  setTSJestRunnerEnv({ rootDir, runFile, localExtraOptions: extraOptions });

  if (useBabelRegister) {
    require("./babel-register");
  }

  jest.run(["--config", jestConfig, ...jestOptions]);
}
