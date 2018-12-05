import { defaults } from "jest-config";
import { parseConfig } from "./ts-utils/parseConfig";

const rootDir = process.cwd();
const { fileNames } = parseConfig(rootDir);

module.exports = {
  rootDir,
  testMatch: fileNames,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
};
