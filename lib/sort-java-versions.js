function sort(a, b, i) {
  if(typeof a[i] === 'undefined' || typeof b[i] === 'undefined') {
    return 0
  }

  if (parseInt(a[i]) < parseInt(b[i])) {
    return 1
  } else if (parseInt(a[i]) == parseInt(b[i])) {
    return sort(a, b, i+1)
  } else {
    return -1
  }
}

function sortJavaVersions(first, second) {
  let a = first.replace(/^1\./g, '').replace(/_/g, '.').split('.');
  let b = second.replace(/^1\./g, '').replace(/_/g, '.').split('.');

  return sort(a, b, 0)
}

module.exports = sortJavaVersions;
