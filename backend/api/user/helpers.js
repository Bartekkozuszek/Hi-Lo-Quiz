module.exports.parseSort = function(sort) {
  if (sort === 'wins' || sort === 'losses' || sort === 'score') {
    return sort
  }
  return 'wins'
}
