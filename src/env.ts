const envKeys = {
  TS_JEST_RUNNER_ROOT_DIR: "TS_JEST_RUNNER_ROOT_DIR",
  TS_JEST_RUNNER_RUN_FILE: "TS_JEST_RUNNER_RUN_FILE",
};

export interface TSJestRunnerEnv {
  rootDir: string;
  runFile: string;
}

export function getTSJestRunnerEnv(): TSJestRunnerEnv {
  for (const envKey of Object.keys(envKeys)) {
    if (!process.env[envKey]) {
      throw new Error(`process.env.${envKey} not set`);
    }
  }

  return {
    rootDir: process.env[envKeys.TS_JEST_RUNNER_ROOT_DIR]!,
    runFile: process.env[envKeys.TS_JEST_RUNNER_RUN_FILE]!,
  };
}

export function setTSJestRunnerEnv(env: TSJestRunnerEnv) {
  process.env[envKeys.TS_JEST_RUNNER_ROOT_DIR] = env.rootDir;
  process.env[envKeys.TS_JEST_RUNNER_RUN_FILE] = env.runFile;
}
