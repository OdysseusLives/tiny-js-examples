var expect = require('chai').expect;
var javaVersions = require('../lib/java-versions');

describe('compareFromVersions()', function () {
  describe('period delimited as a.b.c', function () {
    describe('first grouping', function () {
      it('less than: 8<10', function () {
        let comparison = javaVersions('8', '10');
        expect(comparison).to.be.equal(1);
      });

      it('greater than: 10>8', function () {
        let comparison = javaVersions('10', '8');
        expect(comparison).to.be.equal(-1);
      });

      it('equal to: 8==8', function () {
        let comparison = javaVersions('8', '8');
        expect(comparison).to.be.equal(0);
      });
    });

    describe('second grouping', function () {
      it('less than: 2.8<2.10', function () {
        let comparison = javaVersions('2.8', '2.10');
        expect(comparison).to.be.equal(1);
      });

      it('greater than: 2.10>2.8', function () {
        let comparison = javaVersions('2.10', '2.8');
        expect(comparison).to.be.equal(-1);
      });

      it('equal to: 2.8==2.8', function () {
        let comparison = javaVersions('2.8', '2.8');
        expect(comparison).to.be.equal(0);
      });
    });

    describe('third grouping', function () {
      it('less than: 3.3.8<3.3.10', function () {
        let comparison = javaVersions('3.3.8', '3.3.10');
        expect(comparison).to.be.equal(1);
      });

      it('greater than: 3.3.10>3.3.8', function () {
        let comparison = javaVersions('3.3.10', '3.3.8');
        expect(comparison).to.be.equal(-1);
      });

      it('equal to: 3.3.8==3.3.8', function () {
        let comparison = javaVersions('3.3.8', '3.3.8');
        expect(comparison).to.be.equal(0);
      });
    });
  });

  describe('delimited as x.y.z_w', function () {
    describe('old and new style', function () {
      describe('first level', function() {
        it('less than', function () {
          let comparison = javaVersions('1.8.0_101', '10.0.2');
          expect(comparison).to.be.equal(1);
        });

        it('greater than', function () {
          let comparison = javaVersions('10.0.2', '1.8.0_101');
          expect(comparison).to.be.equal(-1);
        });
      });

      describe('last level', function() {
        it('less than', function () {
          let comparison = javaVersions('1.8.0_101', '1.8.0_102');
          expect(comparison).to.be.equal(1);
        });

        it('greater than', function () {
          let comparison = javaVersions('1.8.0_102', '1.8.0_101');
          expect(comparison).to.be.equal(-1);
        });

        it('equal to', function () {
          let comparison = javaVersions('1.8.0_101', '1.8.0_101');
          expect(comparison).to.be.equal(0);
        });
      });
    });
  });
});
