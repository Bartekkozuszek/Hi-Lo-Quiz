var jwt = require('jsonwebtoken')
var jwtSecret = require('../jwt.js')

// Not the best solution. But now it should work both from insomnia and frontend page
module.exports = function(req, res, next) {
  var access_token_header = req.headers['access_token']

  if (access_token_header !== undefined) {
    try {
      let user = jwt.verify(access_token_header, jwtSecret.JWT_SECRET)
      req.user = {
        id: user.id,
        userName: user.userName,
        isAdmin: user.isAdmin,
        role: user.role
      }
      console.log('auth.js HEADER found access_token')
      next()
      return
    } catch (error) {
      console.log('auth.js No HEADER access_token found')
    }
  }

  var cookie = req.cookies.access_token
  if (cookie === undefined) {
    //No access_token cookie = continue as guest
    req.user = {
      userName: 'Guest',
      isAdmin: false,
      role: 'Guest'
    }
    console.log('auth.js No cookie access_token found')
  } else {
    //Set user from jwt token
    let user = jwt.verify(cookie, jwtSecret.JWT_SECRET)
    req.user = {
      id: user.id,
      userName: user.userName,
      isAdmin: user.isAdmin,
      role: user.role
    }
    console.log('auth.js Cookie access_token=' + cookie)
  }
  next()
  return
}
