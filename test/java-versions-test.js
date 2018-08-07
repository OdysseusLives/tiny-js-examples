var expect = require('chai').expect;
var javaVersions = require('../lib/java-versions');

describe('compareFromVersions()', function () {
  it('8 < 10', function () {
    let comparison = javaVersions('8', '10');

    expect(comparison).to.be.equal(1);

  });
});
