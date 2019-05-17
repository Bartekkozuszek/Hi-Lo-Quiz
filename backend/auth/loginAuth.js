var jwt = require('jsonwebtoken')
var config = require('../jwt.js')
var User = require('../user/user')

module.exports = async function(req, res, next) {
  var cookie = req.cookies.access_token
  if (cookie === undefined) {
    console.log('No cookie access_token found')
    next()
  } else {
    console.log('access_token found')
    user = jwt.verify(cookie, config.JWT_SECRET)
    res.json({ msg: 'allready logged in as: ' + user.userName + ' (' + user.role + ')' })
    return
  }
}
