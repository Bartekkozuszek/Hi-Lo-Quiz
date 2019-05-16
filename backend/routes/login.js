/* eslint-disable prettier/prettier */
// Parts from https://github.com/juffalow/express-jwt-example
// But updated with cookies

var jwt = require('jsonwebtoken')
var config = require('../jwt.js')
const express = require('express')
const router = express.Router()
const User = require('../user/user')

router.post('/login', function(req, res) {

  var name = req.body.userName
  var password = req.body.password

  User.findOne({ userName: name }, function(err, user){
    if(err){
      return res.status(500).json({msg: err.message})
    }
    if(!user){
      return res.status(404).json({msg: 'User not recognized'})
    }
    //compare login password with stored password
    user.comparePassword(password, function(err, isMatch){
      if(isMatch && isMatch == true){
        if(user.isAdmin && user.isAdmin == true){
          var expireTime = 60 * 60
          user.jwt = jwt.sign({
              id: user.id,
              name: 'admin',
              isAdmin: true
            },
            config.JWT_SECRET,
            { expiresIn: expireTime }
          )
          res.cookie('access_token', user.jwt,{
            expires: new Date(Date.now() + 900000),
            httpOnly: true
          })
        }  
        res.status(202).json({msg: 'password match'})
      }else{
        res.status(401).json({msg: 'no password match'})
      }
    })
  })
})

module.exports = router
