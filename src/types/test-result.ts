import { ConsoleBuffer } from "./console";
import { Maybe } from "./utils";

export type RawFileCoverage = {
  path: string;
  s: { [statementId: number]: number };
  b: { [branchId: number]: number };
  f: { [functionId: number]: number };
  l: { [lineId: number]: number };
  fnMap: { [functionId: number]: any };
  statementMap: { [statementId: number]: any };
  branchMap: { [branchId: number]: any };
  inputSourceMap?: Object;
};

export type RawCoverage = {
  [filePath: string]: RawFileCoverage;
};

type FileCoverageTotal = {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
};

export type CoverageSummary = {
  lines: FileCoverageTotal;
  statements: FileCoverageTotal;
  branches: FileCoverageTotal;
  functions: FileCoverageTotal;
  merge: (other: CoverageSummary) => void;
};

export type FileCoverage = {
  getLineCoverage: () => Object;
  getUncoveredLines: () => Array<number>;
  getBranchCoverageByLine: () => Object;
  toJSON: () => Object;
  merge: (other: Object) => void;
  computeSimpleTotals: (property: string) => FileCoverageTotal;
  computeBranchTotals: () => FileCoverageTotal;
  resetHits: () => void;
  toSummary: () => CoverageSummary;
};

export type CoverageMap = {
  merge: (data: Object) => void;
  getCoverageSummary: () => FileCoverage;
  data: RawCoverage;
  addFileCoverage: (fileCoverage: RawFileCoverage) => void;
  files: () => Array<string>;
  fileCoverageFor: (file: string) => FileCoverage;
};

export type SerializableError = {
  code?: any;
  message: string;
  stack: Maybe<string>;
  type?: string;
};

export type FailedAssertion = {
  matcherName: string;
  message?: string;
  actual?: any;
  pass?: boolean;
  expected?: any;
  isNot?: boolean;
  stack?: string;
};

export type AssertionLocation = {
  fullName: string;
  path: string;
};

export type Status = "passed" | "failed" | "skipped" | "pending" | "todo" | "disabled";

export type Bytes = number;
export type Milliseconds = number;

type Callsite = {
  column: number;
  line: number;
};

export type AssertionResult = {
  ancestorTitles: Array<string>;
  duration?: Maybe<Milliseconds>;
  failureMessages: Array<string>;
  fullName: string;
  invocations?: number;
  location: Maybe<Callsite>;
  numPassingAsserts: number;
  status: Status;
  title: string;
};

export type FormattedAssertionResult = {
  failureMessages: Array<string> | null;
  fullName: string;
  location: Maybe<Callsite>;
  status: Status;
  title: string;
};

export type AggregatedResultWithoutCoverage = {
  numFailedTests: number;
  numFailedTestSuites: number;
  numPassedTests: number;
  numPassedTestSuites: number;
  numPendingTests: number;
  numTodoTests: number;
  numPendingTestSuites: number;
  numRuntimeErrorTestSuites: number;
  numTotalTests: number;
  numTotalTestSuites: number;
  openHandles: Array<Error>;
  snapshot: SnapshotSummary;
  startTime: number;
  success: boolean;
  testResults: Array<TestResult>;
  wasInterrupted: boolean;
};

export type AggregatedResult = AggregatedResultWithoutCoverage & {
  coverageMap?: Maybe<CoverageMap>;
};

export type Suite = {
  title: string;
  suites: Array<Suite>;
  tests: Array<AssertionResult>;
};

export type TestResult = {
  console: Maybe<ConsoleBuffer>;
  coverage?: RawCoverage;
  displayName: Maybe<string>;
  failureMessage: Maybe<string>;
  leaks: boolean;
  memoryUsage?: Bytes;
  numFailingTests: number;
  numPassingTests: number;
  numPendingTests: number;
  numTodoTests: number;
  openHandles: Array<Error>;
  perfStats: {
    end: Milliseconds;
    start: Milliseconds;
  };
  skipped: boolean;
  snapshot: {
    added: number;
    fileDeleted: boolean;
    matched: number;
    unchecked: number;
    uncheckedKeys: Array<string>;
    unmatched: number;
    updated: number;
  };
  sourceMaps: { [sourcePath: string]: string };
  testExecError?: SerializableError;
  testFilePath: string;
  testResults: Array<AssertionResult>;
};

export type FormattedTestResult = {
  message: string;
  name: string;
  summary: string;
  status: "failed" | "passed";
  startTime: number;
  endTime: number;
  coverage: any;
  assertionResults: Array<FormattedAssertionResult>;
};

export type FormattedTestResults = {
  coverageMap?: Maybe<CoverageMap>;
  numFailedTests: number;
  numFailedTestSuites: number;
  numPassedTests: number;
  numPassedTestSuites: number;
  numPendingTests: number;
  numPendingTestSuites: number;
  numRuntimeErrorTestSuites: number;
  numTotalTests: number;
  numTotalTestSuites: number;
  snapshot: SnapshotSummary;
  startTime: number;
  success: boolean;
  testResults: Array<FormattedTestResult>;
  wasInterrupted: boolean;
};

export type CodeCoverageReporter = any;

export type CodeCoverageFormatter = (
  coverage: Maybe<RawCoverage>,
  reporter?: CodeCoverageReporter
) => Maybe<Object>;

export type UncheckedSnapshot = {
  filePath: string;
  keys: Array<string>;
};

export type SnapshotSummary = {
  added: number;
  didUpdate: boolean;
  failure: boolean;
  filesAdded: number;
  filesRemoved: number;
  filesUnmatched: number;
  filesUpdated: number;
  matched: number;
  total: number;
  unchecked: number;
  uncheckedKeysByFile: Array<UncheckedSnapshot>;
  unmatched: number;
  updated: number;
};
