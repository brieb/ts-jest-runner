import { ExtraOptions, LocalExtraOptions } from "./extra-options";
import { TestResult } from "./test-result";

export interface RunOptions<TLocalExtraOptions extends LocalExtraOptions = {}> {
  /** Path of the file that is going to be tests. */
  testPath: string;

  /** Jest Project config used by this file. */
  config: any;

  /** Jest global config. */
  globalConfig: any;

  /** The return value of the { getExtraOptions } argument of createJestRunner(...) the entry file. */
  extraOptions: ExtraOptions & TLocalExtraOptions;

  options: any;
  rawModuleMap: any;
}

export interface Runner {
  (options: RunOptions): TestResult | Promise<TestResult>;
}
