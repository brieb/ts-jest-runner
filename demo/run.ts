const fs = require("fs");
const { pass, fail } = require("../lib/index");

module.exports = function run({ testPath }) {
  const start = Date.now();
  const contents = fs.readFileSync(testPath, "utf8");
  const end = Date.now();

  const title = "Check for ⚔️ 🏃";
  if (contents.includes("⚔️🏃")) {
    return pass({ start, end, test: { path: testPath, title } });
  }
  const errorMessage = "Company policies require ⚔️ 🏃 in every file";
  return fail({ start, end, test: { path: testPath, title, errorMessage } });
};
