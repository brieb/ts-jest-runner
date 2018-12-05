import { TestResult } from "./test-result";
import { ExtraOptions } from "./extra-options";

export interface RunOptions {
  /** Path of the file that is going to be tests. */
  testPath: string;

  /** Jest Project config used by this file. */
  config: any;

  /** Jest global config. */
  globalConfig: any;

  /** The return value of the { getExtraOptions } argument of createJestRunner(...) the entry file. */
  extraOptions: ExtraOptions;

  options: any;
  rawModuleMap: any;
}

export interface Runner {
  (options: RunOptions): TestResult | Promise<TestResult>;
}
