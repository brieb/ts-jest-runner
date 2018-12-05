import path from "path";
import { defaults } from "jest-config";
import { getTSJestRunnerEnv } from "./env";
import { parseTSConfig } from "./parse-tsconfig";

const { rootDir } = getTSJestRunnerEnv();
const { fileNames } = parseTSConfig(rootDir);

export = {
  rootDir,
  testMatch: fileNames,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  runner: path.resolve(__dirname, "jest-runner.js"),
};
