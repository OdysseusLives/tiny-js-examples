#! /usr/bin/env node

// Example usage: ./lib/java-versions.js -a 1.8.0_111 -b 10.0.2

var argv = require('yargs').argv;

console.log('a: %s, b: %s', argv.a, argv.b);

var first = argv.a.replace(/^1\./g, '').replace(/_/g, '.').split('.')
var second = argv.b.replace(/^1\./g, '').replace(/_/g, '.').split('.')
first.forEach(function(element, index) {
  console.log('======' + index + '======');
  console.log(element + ' is compared to '+ second[index]);
});
