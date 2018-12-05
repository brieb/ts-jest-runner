import ts from "typescript";

export interface ParseConfigResult {
  options: ts.CompilerOptions;
  fileNames: string[];
}

export function parseTSConfig(basePath: string): ParseConfigResult {
  const configFileName = ts.findConfigFile(basePath, ts.sys.fileExists);
  if (!configFileName) {
    throw new Error("TypeScript config file not found");
  }

  const configFileContents = ts.sys.readFile(configFileName);
  if (configFileContents == null) {
    throw new Error(`Failed to read TypeScript config file: ${configFileName}`);
  }

  const { config, error } = ts.parseConfigFileTextToJson(configFileName, configFileContents);
  if (error) {
    const errorMessage = ts.flattenDiagnosticMessageText(error.messageText, ts.sys.newLine);
    throw new Error(`Error parsing TypeScript config file ${configFileName}: ${errorMessage}`);
  }

  const { options, fileNames, errors } = ts.parseJsonConfigFileContent(
    config,
    {
      useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
      fileExists: ts.sys.fileExists,
      readFile: ts.sys.readFile,
      readDirectory: ts.sys.readDirectory,
    },
    basePath
  );
  if (errors.length > 0) {
    const errorMessage = ts.formatDiagnostics(errors, {
      getCanonicalFileName: fileName => fileName,
      getCurrentDirectory: () => basePath,
      getNewLine: () => ts.sys.newLine,
    });
    throw new Error(`Errors parsing TypeScript config: ${errorMessage}`);
  }

  return { options, fileNames };
}
