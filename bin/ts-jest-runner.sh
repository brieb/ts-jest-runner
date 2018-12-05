#!/usr/bin/env node
var path = require("path");
var cli = require.resolve(path.join(__dirname, "../lib/cli"));
require(cli);
