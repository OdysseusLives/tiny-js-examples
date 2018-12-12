#! /usr/bin/env node
/* eslint-disable no-console */

const { argv } = require('yargs')
  .usage('Usage: $0 [first-java-version] [second-java-version]\ni.e. "$0 1.8.0_111 10.0.2"')
  .demandCommand(2);
const SortJavaVersions = require('./lib/sort-java-versions.js');

console.log('first: %s, second: %s', argv._[0], argv._[1]);
console.log(SortJavaVersions.sortJavaVersions(argv._[0], argv._[1], 0));
