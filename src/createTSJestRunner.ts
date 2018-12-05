import throat from "throat";
import Worker from "jest-worker";

class CancelRun extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "CancelRun";
  }
}

export interface TSJestRunner {
  runTests(
    tests: any,
    watcher: any,
    onStart: any,
    onResult: any,
    onFailure: any,
    options: any
  ): Promise<any>;
}

export interface TSJestRunnerConstructor {
  new (...args: any[]): TSJestRunner;
}

export interface TSJestRunnerConfig {
  /**
   * Used for passing extra options to the runner.
   * It needs to be a serializable object because it will be send to a different Node process.
   */
  getExtraOptions?(): object;
}

interface GlobalConfig {
  maxWorkers: number;
}

// Inspired by https://github.com/jest-community/create-jest-runner/blob/25423468545c0108c2ff1ae3ee3f9b9586b8be23/lib/createJestRunner.js
export function createTSJestRunner(
  runPath: string,
  { getExtraOptions }: TSJestRunnerConfig = {}
): TSJestRunnerConstructor {
  class BaseTestRunner implements TSJestRunner {
    constructor(private globalConfig: GlobalConfig) {}

    runTests(tests: any, watcher: any, onStart: any, onResult: any, onFailure: any, options: any) {
      return options.serial
        ? this.createInBandTestRun(tests, watcher, onStart, onResult, onFailure, options)
        : this.createParallelTestRun(tests, watcher, onStart, onResult, onFailure, options);
    }

    private async createInBandTestRun(
      tests: any,
      watcher: any,
      onStart: any,
      onResult: any,
      onFailure: any,
      options: any
    ) {
      const mutex = throat(1);
      return tests.reduce(
        (promise: Promise<any>, test: any) =>
          mutex(() =>
            promise
              .then(() => {
                if (watcher.isInterrupted()) {
                  throw new CancelRun();
                }

                return onStart(test).then(() => {
                  const runner = require(runPath);
                  const baseOptions = {
                    config: test.context.config,
                    globalConfig: this.globalConfig,
                    testPath: test.path,
                    rawModuleMap: watcher.isWatchMode()
                      ? test.context.moduleMap.getRawModuleMap()
                      : null,
                    options,
                    extraOptions: getExtraOptions ? getExtraOptions() : {},
                  };

                  if (typeof runner.default === "function") {
                    return runner.default(baseOptions);
                  }

                  return runner(baseOptions);
                });
              })
              .then(result => onResult(test, result))
              .catch(err => onFailure(test, err))
          ),
        Promise.resolve()
      );
    }

    private async createParallelTestRun(
      tests: any,
      watcher: any,
      onStart: any,
      onResult: any,
      onFailure: any,
      options: any
    ) {
      const worker = new Worker(runPath, {
        exposedMethods: ["default"],
        numWorkers: this.globalConfig.maxWorkers,
        forkOptions: { stdio: "inherit" },
      });

      const mutex = throat(this.globalConfig.maxWorkers);

      const runTestInWorker = (test: any) =>
        mutex(() => {
          if (watcher.isInterrupted()) {
            throw new CancelRun();
          }

          return onStart(test).then(() => {
            const baseOptions = {
              config: test.context.config,
              globalConfig: this.globalConfig,
              testPath: test.path,
              rawModuleMap: watcher.isWatchMode() ? test.context.moduleMap.getRawModuleMap() : null,
              options,
              extraOptions: getExtraOptions ? getExtraOptions() : {},
            };

            return worker.default(baseOptions);
          });
        });

      const onError = (err: any, test: any) => {
        return onFailure(test, err).then(() => {
          if (err.type === "ProcessTerminatedError") {
            console.error(
              "A worker process has quit unexpectedly! " +
                "Most likely this is an initialization error."
            );
            process.exit(1);
          }
        });
      };

      const onInterrupt = new Promise((_, reject) => {
        watcher.on("change", (state: any) => {
          if (state.interrupted) {
            reject(new CancelRun());
          }
        });
      });

      const runAllTests = Promise.all(
        tests.map((test: any) =>
          runTestInWorker(test)
            .then(testResult => onResult(test, testResult))
            .catch(error => onError(error, test))
        )
      );

      const cleanup = () => worker.end();

      return Promise.race([runAllTests, onInterrupt]).then(cleanup, cleanup);
    }
  }

  return BaseTestRunner;
}
