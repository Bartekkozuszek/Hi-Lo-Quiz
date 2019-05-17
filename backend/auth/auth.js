var jwt = require('jsonwebtoken')
var config = require('../jwt.js')

module.exports = function(req, res, next) {
  var cookie = req.cookies.access_token
  if (cookie === undefined) {
    //No access_token cookie = continue as guest
    req.user = {
      name: 'Guest',
      isAdmin: false
    }
    console.log('No cookie access_token found')
  } else {
    //Set user from jwt token
    req.user = jwt.verify(cookie, config.JWT_SECRET)
    console.log('Cookie access_token=' + cookie)
  }
  next()
  return
}
