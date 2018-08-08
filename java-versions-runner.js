#! /usr/bin/env node

var javaVersions = require('./lib/java-versions.js');
var argv = require('yargs')
  .usage('Usage: $0 [first-java-version] [second-java-version]\ni.e. "$0 1.8.0_111 10.0.2"')
  .demandCommand(2)
  .argv;


console.log('first: %s, second: %s', argv._[0], argv._[1]);
console.log(javaVersions(argv._[0], argv._[1], 0))
