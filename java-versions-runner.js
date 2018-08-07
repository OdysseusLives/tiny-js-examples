#! /usr/bin/env node

// Example usage: ./java-versions-runner.js -a 1.8.0_111 -b 10.0.2

var javaVersions = require('./lib/java-versions.js');
var argv = require('yargs').argv;

console.log('a: %s, b: %s', argv.a, argv.b);
console.log(javaVersions(argv.a, argv.b, 0))
