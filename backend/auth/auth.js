var jwt = require('jsonwebtoken')
var config = require('../jwt.js')
var User = require('../user/user')


module.exports = function(req, res, next) {
  var cookie = req.cookies.access_token
  if (cookie === undefined) {
    //No access_token cookie = continue as guest
    req.user = {
      userName: 'Guest',
      isAdmin: false,
      role: 'Guest'
    }
    console.log('No cookie access_token found')
  } else {
    //Set user from jwt token
    user = jwt.verify(cookie, config.JWT_SECRET)
    req.user = {
      id: user.id,
      userName: user.userName,
      isAdmin: user.isAdmin,
      role: user.role
    }
    console.log('Cookie access_token=' + cookie)
  }
  next()
  return
}
