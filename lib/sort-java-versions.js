function sort(a, b, i) {
  if (typeof a[i] === 'undefined' || typeof b[i] === 'undefined') {
    return 0;
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

function sortJavaVersions(first, second) {
  const a = first.replace(/^1\./g, '').replace(/_/g, '.').split('.');
  const b = second.replace(/^1\./g, '').replace(/_/g, '.').split('.');

  return sort(a, b, 0);
}

module.exports = sortJavaVersions;
