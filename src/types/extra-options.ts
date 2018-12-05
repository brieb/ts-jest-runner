import ts from "typescript";

export interface ExtraOptions {
  tsCompilerOptions: ts.CompilerOptions;
}

/** Local extra options for consumers. Must be serializable. */
export type LocalExtraOptions = { [key: string]: string | number };
