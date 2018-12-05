import ts from "typescript";

export default function createParseConfigHost(): ts.ParseConfigHost {
  return {
    useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
  };
}
