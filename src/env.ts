import { LocalExtraOptions } from "./types/extra-options";

const envKeys = {
  TS_JEST_RUNNER_ROOT_DIR: "TS_JEST_RUNNER_ROOT_DIR",
  TS_JEST_RUNNER_RUN_FILE: "TS_JEST_RUNNER_RUN_FILE",
  TS_JEST_RUNNER_LOCAL_EXTRA_OPTIONS: "TS_JEST_RUNNER_LOCAL_EXTRA_OPTIONS",
};

export interface TSJestRunnerEnv {
  rootDir: string;
  runFile: string;
  localExtraOptions: LocalExtraOptions;
}

export function getTSJestRunnerEnv(): TSJestRunnerEnv {
  for (const envKey of Object.keys(envKeys)) {
    if (process.env[envKey] == null) {
      throw new Error(`process.env.${envKey} not set`);
    }
  }

  return {
    rootDir: process.env[envKeys.TS_JEST_RUNNER_ROOT_DIR]!,
    runFile: process.env[envKeys.TS_JEST_RUNNER_RUN_FILE]!,
    localExtraOptions: JSON.parse(process.env[envKeys.TS_JEST_RUNNER_LOCAL_EXTRA_OPTIONS]!),
  };
}

export function setTSJestRunnerEnv(env: TSJestRunnerEnv) {
  process.env[envKeys.TS_JEST_RUNNER_ROOT_DIR] = env.rootDir;
  process.env[envKeys.TS_JEST_RUNNER_RUN_FILE] = env.runFile;
  process.env[envKeys.TS_JEST_RUNNER_LOCAL_EXTRA_OPTIONS] = JSON.stringify(env.localExtraOptions);
}
