function sort(a, b, i) {
  if (typeof a[i] === 'undefined' && typeof b[i] === 'undefined') {
    return 0;
  }
  if (typeof a[i] === 'undefined') {
    return -1;
  }
  if (typeof b[i] === 'undefined') {
    return 1;
  }

  const radix = 10;
  if (parseInt(a[i], radix) < parseInt(b[i], radix)) {
    return 1;
  }
  if (parseInt(a[i], radix) === parseInt(b[i], radix)) {
    return sort(a, b, i + 1);
  }
  return -1;
}

function standardizeVersions(version) {
  return version
    .replace(/^1\./g, '')
    .replace(/[a-zA-Z\\-]+/g, '_1')
    .replace(/_/g, '.')
    .split('.');
}

function sortJavaVersions(first, second) {
  const a = standardizeVersions(first);
  const b = standardizeVersions(second);

  return sort(a, b, 0);
}

module.exports = {
  standardizeVersions,
  sortJavaVersions,
};
