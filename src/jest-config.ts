import path from "path";
import { defaults } from "jest-config";
import { parseTSConfig } from "./parse-tsconfig";

const rootDir = process.cwd();
const { fileNames } = parseTSConfig(rootDir);

module.exports = {
  rootDir,
  testMatch: fileNames,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  runner: path.resolve(__dirname, "jest-runner.js"),
};
