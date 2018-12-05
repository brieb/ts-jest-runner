import path from "path";
import jest from "jest";
import program from "commander";

import "./babel-register";

const version = require("../package.json").version;

program
  .version(version)
  .option("-r, --run <run>", "Path to run file (required)")
  .parse(process.argv);

if (!program.run) {
  program.help();
}

const jestConfig = path.join(__dirname, "jest-config.js");
const runFile = require.resolve(path.join(process.cwd(), program.run));

process.env["TS_JEST_RUNNER_RUN_FILE"] = runFile;
jest.run(["--config", jestConfig]);
