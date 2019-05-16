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
    //compare login password with hashed password
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
            { 
              expiresIn: expireTime 
            })
        }
        res.cookie('access_token', user.jwt,{
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        })
        //req.user = user
        res.json({msg: 'password match'})
      }else{
        res.status(401).json({msg: 'no password match'})

      }
    })
    //req.session.user= user
    //res.status(200).send()
  })
})
  // if (req.body.name === 'admin' && req.body.password === 'admin') {
  //   var expireTime = 60 * 60
  //   var user = {
  //     id: 1,
  //     name: 'admin',
  //     isAdmin: true,
  //     jwt: jwt.sign(
  //       {
  //         id: 1,
  //         name: 'admin',
  //         isAdmin: true
  //       },
  //       config.JWT_SECRET,
  //       { expiresIn: expireTime }
  //     )
  //   }
  //   //Set JWT token as cookie
  //   res.cookie('access_token', user.jwt, {
  //     expires: new Date(Date.now() + 900000),
  //     httpOnly: true
  //   })
  //   res.json(user)




  // } else {
  //   /*
  //    * If the name or password was wrong, return 401 ( Unauthorized )
  //    * status code and JSON error message
  //    */
  //   res.status(401).json({
  //     error: {
  //       message: 'Wrong name or password!'
  //     }
  //   })
  // }


module.exports = router
