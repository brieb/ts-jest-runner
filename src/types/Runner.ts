import { TestResult } from "./TestResult";

export interface RunnerOptions {
  /** Path of the file that is going to be tests. */
  testPath: string;
  /** Jest Project config used by this file. */
  config: any;
  /** Jest global config. */
  globalConfig: any;
  /** The return value of the { getExtraOptions } argument of createJestRunner(...) the entry file. */
  extraOptions: any;

  rawModuleMap: any;
  options: any;
}

export type RunnerResult = TestResult | Error;

export interface Runner {
  (options: RunnerOptions): RunnerResult | Promise<RunnerResult>;
}
