var jwt = require('jsonwebtoken')
var jwtSecret = require('../jwt.js')

module.exports = async function(req, res, next) {
  var cookie = req.cookies.access_token
  if (cookie === undefined) {
    console.log('No cookie access_token found')
    next()
  } else {
    console.log('access_token found')
    user = jwt.verify(cookie, jwtSecret.JWT_SECRET)
    res.json({ msg: 'already logged in as: ' + user.userName + ' (' + user.role + ')' })
    return
  }
}
