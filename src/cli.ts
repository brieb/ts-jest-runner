import program from "commander";
import path from "path";
import { tsJestRunner } from "./api";

const version = require("../package.json").version;

program
  .version(version)
  .option("-r, --run <run>", "Path to run file (required)")
  .parse(process.argv);

if (!program.run) {
  program.help();
}

const rootDir = process.cwd();

tsJestRunner({
  rootDir,
  runFile: path.join(rootDir, program.run),
  useBabelRegister: true,
});
