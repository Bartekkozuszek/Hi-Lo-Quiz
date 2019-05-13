// From https://github.com/juffalow/express-jwt-example

var jwt = require('jsonwebtoken')
var config = require('../jwt.js')

module.exports = function(req, res, next) {
  console.log('KOM hit')
  /*
   * Check if authorization header is set
   */
  if (
    req.hasOwnProperty('headers') &&
    req.headers.hasOwnProperty('authorization')
  ) {
    try {
      /*
       * Try to decode & verify the JWT token
       * The token contains user's id ( it can contain more informations )
       * and this is saved in req.user object
       */
      req.user = jwt.verify(req.headers['authorization'], config.JWT_SECRET)
    } catch (err) {
      /*
       * If the authorization header is corrupted, it throws exception
       * So return 401 status code with JSON error message
       */
      // return res.status(401).json({
      //   error: {
      //     msg: 'Failed to authenticate token!'
      //   }
      // })
      req.user = {
        name: 'Guest',
        isAdmin: false
      }
    }
  } else {
    /*
     * If there is no autorization header, return 401 status code with JSON
     * error message
     */
    // return res.status(401).json({
    //   error: {
    //     msg: 'No token!'
    //   }
    // })
    req.user = {
      name: 'Guest',
      isAdmin: false
    }
  }
  next()
  return
}
