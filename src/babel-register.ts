import { DEFAULT_EXTENSIONS } from "@babel/core";
import escapeRegExp from "lodash/escapeRegExp";
import path from "path";

require("@babel/register")({
  babelrc: false,
  presets: ["@babel/preset-env", "@babel/preset-typescript"],
  plugins: ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"],
  extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
  // By default, babel register only compiles things inside the current working directory.
  // https://github.com/babel/babel/blob/2a4f16236656178e84b05b8915aab9261c55782c/packages/babel-register/src/node.js#L140-L157
  ignore: [new RegExp(escapeRegExp(path.sep + "node_modules" + path.sep))],
});
