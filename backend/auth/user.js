// From https://github.com/juffalow/express-jwt-example

var jwt = require('jsonwebtoken')
var config = require('../jwt.js')
const express = require('express')
const router = express.Router()

router.post('/login', function(req, res) {
  /*
   * Check if the name and password is correct
   */
  if (req.body.name === 'admin' && req.body.password === 'admin') {
    res.json({
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
        { expiresIn: 60 * 60 }
      )
    })
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
