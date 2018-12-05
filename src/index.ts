import { fail as _fail, pass as _pass, skip as _skip } from "create-jest-runner";
import { tsJestRunner, TSJestRunnerConfig } from "./api";
import { Runner, RunOptions } from "./types/run";
import { TestResult } from "./types/test-result";

type TestParam = { path: string; title?: string; errorMessage?: string };

type PassParams = { start: number; end: number; test: TestParam };
const pass = _pass as (params: PassParams) => TestResult;

type FailParams = { start: number; end: number; test: TestParam; errorMessage?: string };
const fail = _fail as (params: FailParams) => TestResult;

type SkipParams = { start: number; end: number; test: TestParam };
const skip = _skip as (params: SkipParams) => TestResult;

export { Runner, RunOptions, pass, fail, skip, TestResult, tsJestRunner, TSJestRunnerConfig };
