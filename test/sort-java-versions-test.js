/* eslint-disable func-names, prefer-arrow-callback */

const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const SortJavaVersions = require('../lib/sort-java-versions');

describe('sortJavaVersions()', function () {
  describe('period delimited as a.b.c', function () {
    describe('first grouping', function () {
      it('less than: 8<10', function () {
        const comparison = SortJavaVersions.sortJavaVersions('8', '10');
        expect(comparison).to.be.equal(1);
      });

      it('greater than: 10>8', function () {
        const comparison = SortJavaVersions.sortJavaVersions('10', '8');
        expect(comparison).to.be.equal(-1);
      });

      it('equal to: 8==8', function () {
        const comparison = SortJavaVersions.sortJavaVersions('8', '8');
        expect(comparison).to.be.equal(0);
      });
    });

    describe('second grouping', function () {
      it('less than: 2.8<2.10', function () {
        const comparison = SortJavaVersions.sortJavaVersions('2.8', '2.10');
        expect(comparison).to.be.equal(1);
      });

      it('greater than: 2.10>2.8', function () {
        const comparison = SortJavaVersions.sortJavaVersions('2.10', '2.8');
        expect(comparison).to.be.equal(-1);
      });

      it('equal to: 2.8==2.8', function () {
        const comparison = SortJavaVersions.sortJavaVersions('2.8', '2.8');
        expect(comparison).to.be.equal(0);
      });
    });

    describe('third grouping', function () {
      it('less than: 3.3.8<3.3.10', function () {
        const comparison = SortJavaVersions.sortJavaVersions('3.3.8', '3.3.10');
        expect(comparison).to.be.equal(1);
      });

      it('greater than: 3.3.10>3.3.8', function () {
        const comparison = SortJavaVersions.sortJavaVersions('3.3.10', '3.3.8');
        expect(comparison).to.be.equal(-1);
      });

      it('equal to: 3.3.8==3.3.8', function () {
        const comparison = SortJavaVersions.sortJavaVersions('3.3.8', '3.3.8');
        expect(comparison).to.be.equal(0);
      });
    });

    describe('with pre-release version', function () {
      describe('last level', function () {
        it('less than: 1.8.0_101-ea<1.8.0_101', function () {
          const comparison = SortJavaVersions.sortJavaVersions('1.8.0_101-ea', '1.8.0_101');
          expect(comparison).to.be.equal(1);
        });

        it('greater than: 1.8.0_101>1.8.0_101-ea', function () {
          const comparison = SortJavaVersions.sortJavaVersions('1.8.0_101', '1.8.0_101-ea');
          expect(comparison).to.be.equal(-1);
        });

        it('equal to: 1.8.0_101-ea==1.8.0_101-ea', function () {
          const comparison = SortJavaVersions.sortJavaVersions('1.8.0_101-ea', '1.8.0_101-ea');
          expect(comparison).to.be.equal(0);
        });
      });
    });
  });

  describe('delimited as x.y.z_w', function () {
    describe('old and new style', function () {
      describe('first level', function () {
        it('less than: 1.8.0_101<10.0.2', function () {
          const comparison = SortJavaVersions.sortJavaVersions('1.8.0_101', '10.0.2');
          expect(comparison).to.be.equal(1);
        });

        it('greater than: 10.0.2>1.8.0_101', function () {
          const comparison = SortJavaVersions.sortJavaVersions('10.0.2', '1.8.0_101');
          expect(comparison).to.be.equal(-1);
        });
      });

      describe('last level', function () {
        it('less than: 1.8.0_101<1.8.0_102', function () {
          const comparison = SortJavaVersions.sortJavaVersions('1.8.0_101', '1.8.0_102');
          expect(comparison).to.be.equal(1);
        });

        it('greater than: 1.8.0_102>1.8.0_101', function () {
          const comparison = SortJavaVersions.sortJavaVersions('1.8.0_102', '1.8.0_101');
          expect(comparison).to.be.equal(-1);
        });

        it('equal to: 1.8.0_101==1.8.0_101', function () {
          const comparison = SortJavaVersions.sortJavaVersions('1.8.0_101', '1.8.0_101');
          expect(comparison).to.be.equal(0);
        });
      });
    });
  });
});

describe('standardizedVersions()', function () {
  it('new style with pre-release version', function () {
    const comparison = SortJavaVersions.standardizeVersions('10.0.2-ea');
    expect(comparison).to.shallowDeepEqual(['10', '0', '2', '1']);
  });
  it('old style with pre-release version', function () {
    const comparison = SortJavaVersions.standardizeVersions('1.8.101-ea');
    expect(comparison).to.shallowDeepEqual(['8', '101', '1']);
  });
});
