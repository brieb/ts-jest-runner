#!/usr/bin/env node
var path = require("path");
var jest = require("jest");
var program = require("commander");
var version = require("../package.json").version;

program
  .version(version)
  .option("-r, --run <run>", "Path to run file (required)")
  .parse(process.argv);

if (!program.run) {
  program.help();
}

var jestConfig = path.resolve(__dirname, "../lib/jest-config.js");
var runFile = require.resolve(path.resolve(process.cwd(), program.run));

process.env["TS_JEST_RUNNER_RUN_FILE"] = runFile;
jest.run(["--config", jestConfig]);
