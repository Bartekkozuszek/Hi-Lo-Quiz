module.exports.parseSort = function(sort) {
  if (sort === 'wins' || sort === 'losses') {
    return sort
  }
  return 'wins'
}
