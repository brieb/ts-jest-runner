import fs from "fs";
import { RunOptions, pass, fail } from "../lib/index";

export default function run({ testPath }: RunOptions) {
  const start = Date.now();
  const contents = fs.readFileSync(testPath, "utf8");
  const end = Date.now();

  const title = "Check for ⚔️ 🏃";
  if (contents.includes("⚔️🏃")) {
    return pass({ start, end, test: { path: testPath, title } });
  }
  const errorMessage = "Company policies require ⚔️ 🏃 in every file";
  return fail({ start, end, test: { path: testPath, title, errorMessage } });
}
