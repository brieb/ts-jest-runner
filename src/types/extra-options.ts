import ts from "typescript";

export interface ExtraOptions {
  tsCompilerOptions: ts.CompilerOptions;
  local: LocalExtraOptions;
}

/** Allow consumers to add additional options. */
export type LocalExtraOptions = { [key: string]: string | number };
