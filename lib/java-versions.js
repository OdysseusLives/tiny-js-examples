function compare(a, b, i) {
  if(typeof a[i] === 'undefined' || typeof b[i] === 'undefined') {
    return 0
  }

  if (parseInt(a[i]) < parseInt(b[i])) {
    return 1
  } else if (parseInt(a[i]) == parseInt(b[i])) {
    return compare(a, b, i+1)
  } else {
    return -1
  }
}

function javaVersions(first, second) {
  var a = first.replace(/^1\./g, '').replace(/_/g, '.').split('.')
  var b = second.replace(/^1\./g, '').replace(/_/g, '.').split('.')

  return compare(a, b, 0)
}

module.exports = javaVersions;
