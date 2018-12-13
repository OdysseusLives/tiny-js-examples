const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const SortJavaVersions = require('../lib/sort-java-versions');

describe('sortJavaVersions()', () => {
  describe('period delimited as a.b.c', () => {
    describe('first grouping', () => {
      it('less than: 8<10', () => {
        const comparison = SortJavaVersions.sortJavaVersions('8', '10');
        expect(comparison).to.be.equal(1);
      });

      it('greater than: 10>8', () => {
        const comparison = SortJavaVersions.sortJavaVersions('10', '8');
        expect(comparison).to.be.equal(-1);
      });

      it('equal to: 8==8', () => {
        const comparison = SortJavaVersions.sortJavaVersions('8', '8');
        expect(comparison).to.be.equal(0);
      });
    });

    describe('second grouping', () => {
      it('less than: 2.8<2.10', () => {
        const comparison = SortJavaVersions.sortJavaVersions('2.8', '2.10');
        expect(comparison).to.be.equal(1);
      });

      it('greater than: 2.10>2.8', () => {
        const comparison = SortJavaVersions.sortJavaVersions('2.10', '2.8');
        expect(comparison).to.be.equal(-1);
      });

      it('equal to: 2.8==2.8', () => {
        const comparison = SortJavaVersions.sortJavaVersions('2.8', '2.8');
        expect(comparison).to.be.equal(0);
      });
    });

    describe('third grouping', () => {
      it('less than: 3.3.8<3.3.10', () => {
        const comparison = SortJavaVersions.sortJavaVersions('3.3.8', '3.3.10');
        expect(comparison).to.be.equal(1);
      });

      it('greater than: 3.3.10>3.3.8', () => {
        const comparison = SortJavaVersions.sortJavaVersions('3.3.10', '3.3.8');
        expect(comparison).to.be.equal(-1);
      });

      it('equal to: 3.3.8==3.3.8', () => {
        const comparison = SortJavaVersions.sortJavaVersions('3.3.8', '3.3.8');
        expect(comparison).to.be.equal(0);
      });
    });

    describe('with pre-release version', () => {
      describe('last level', () => {
        it('less than: 1.8.0_101-ea<1.8.0_101', () => {
          const comparison = SortJavaVersions.sortJavaVersions(
            '1.8.0_101-ea',
            '1.8.0_101',
          );
          expect(comparison).to.be.equal(1);
        });

        it('greater than: 1.8.0_101>1.8.0_101-ea', () => {
          const comparison = SortJavaVersions.sortJavaVersions(
            '1.8.0_101',
            '1.8.0_101-ea',
          );
          expect(comparison).to.be.equal(-1);
        });

        it('equal to: 1.8.0_101-ea==1.8.0_101-ea', () => {
          const comparison = SortJavaVersions.sortJavaVersions(
            '1.8.0_101-ea',
            '1.8.0_101-ea',
          );
          expect(comparison).to.be.equal(0);
        });
      });
    });
  });

  describe('delimited as x.y.z_w', () => {
    describe('old and new style', () => {
      describe('first level', () => {
        it('less than: 1.8.0_101<10.0.2', () => {
          const comparison = SortJavaVersions.sortJavaVersions(
            '1.8.0_101',
            '10.0.2',
          );
          expect(comparison).to.be.equal(1);
        });

        it('greater than: 10.0.2>1.8.0_101', () => {
          const comparison = SortJavaVersions.sortJavaVersions(
            '10.0.2',
            '1.8.0_101',
          );
          expect(comparison).to.be.equal(-1);
        });
      });

      describe('last level', () => {
        it('less than: 1.8.0_101<1.8.0_102', () => {
          const comparison = SortJavaVersions.sortJavaVersions(
            '1.8.0_101',
            '1.8.0_102',
          );
          expect(comparison).to.be.equal(1);
        });

        it('greater than: 1.8.0_102>1.8.0_101', () => {
          const comparison = SortJavaVersions.sortJavaVersions(
            '1.8.0_102',
            '1.8.0_101',
          );
          expect(comparison).to.be.equal(-1);
        });

        it('equal to: 1.8.0_101==1.8.0_101', () => {
          const comparison = SortJavaVersions.sortJavaVersions(
            '1.8.0_101',
            '1.8.0_101',
          );
          expect(comparison).to.be.equal(0);
        });
      });
    });
  });
});

describe('standardizedVersions()', () => {
  it('new style with pre-release version', () => {
    const comparison = SortJavaVersions.standardizeVersions('10.0.2-ea');
    expect(comparison).to.shallowDeepEqual(['10', '0', '2', '1']);
  });
  it('old style with pre-release version', () => {
    const comparison = SortJavaVersions.standardizeVersions('1.8.101-ea');
    expect(comparison).to.shallowDeepEqual(['8', '101', '1']);
  });
});
