import ts from "typescript";

export interface ExtraOptions {
  tsCompilerOptions: ts.CompilerOptions;
}

/** Local extra options for consumers. Must be JSON-serializable. */
export type LocalExtraOptions = JSONObject;

// https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-331765301
type JSONPrimitive = string | number | boolean | null | undefined;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
type JSONObject = { [member: string]: JSONValue };
interface JSONArray extends Array<JSONValue> {}
