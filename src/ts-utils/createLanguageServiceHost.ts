import ts from "typescript";

export function createLanguageServiceHost({
  basePath,
  options,
  fileNames,
}: {
  basePath: string;
  options: ts.CompilerOptions;
  fileNames: string[];
}): ts.LanguageServiceHost {
  const fileVersions: { [fileName: string]: number } = {};

  return {
    getCompilationSettings: () => options,
    getScriptFileNames: () => fileNames,
    getScriptVersion: fileName => {
      if (fileVersions[fileName] == null) {
        fileVersions[fileName] = 0;
      }

      return fileVersions[fileName].toString();
    },
    getScriptSnapshot: fileName => {
      return ts.sys.fileExists(fileName)
        ? ts.ScriptSnapshot.fromString(ts.sys.readFile(fileName)!)
        : undefined;
    },
    getCurrentDirectory: () => basePath,
    getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
    getNewLine: () => ts.sys.newLine,
    useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
    readDirectory: ts.sys.readDirectory,
    readFile: ts.sys.readFile,
    writeFile: ts.sys.writeFile,
    realpath: ts.sys.realpath,
    fileExists: ts.sys.fileExists,
    getDirectories: ts.sys.getDirectories,
    resolveModuleNames: (moduleNames, containingFile) => {
      return moduleNames.map(moduleName => {
        const result = ts.resolveModuleName(moduleName, containingFile, options, {
          fileExists: ts.sys.fileExists,
          readFile: ts.sys.readFile,
        });

        return result.resolvedModule!;
      });
    },
  };
}
