// Parts from https://github.com/juffalow/express-jwt-example
// But updated with cookies

var jwt = require('jsonwebtoken')
var config = require('../jwt.js')
const express = require('express')
const router = express.Router()

router.post('/login', function(req, res) {
  /*
   * Check if the name and password is correct
   */
  if (req.body.name === 'admin' && req.body.password === 'admin') {
    var expireTime = 60 * 60
    var user = {
      id: 1,
      name: 'admin',
      isAdmin: true,
      jwt: jwt.sign(
        {
          id: 1,
          name: 'admin',
          isAdmin: true
        },
        config.JWT_SECRET,
        { expiresIn: expireTime }
      )
    }
    //Set JWT token as cookie
    res.cookie('access_token', user.jwt, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true
    })
    res.json(user)
  } else {
    /*
     * If the name or password was wrong, return 401 ( Unauthorized )
     * status code and JSON error message
     */
    res.status(401).json({
      error: {
        message: 'Wrong name or password!'
      }
    })
  }
})

module.exports = router
