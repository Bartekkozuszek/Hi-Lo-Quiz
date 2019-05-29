/* eslint-disable prettier/prettier */
// Parts from https://github.com/juffalow/express-jwt-example
// But updated with cookies

const jwt = require('jsonwebtoken')
const config = require('../jwt.js')
const express = require('express')
const router = express.Router()
const User = require('../api/user/user')
const jwtSecret = require('../jwt.js')

router.post('/login', function(req, res) {
  var name = req.body.userName
  var password = req.body.password

  User.findOne({ userName: name }, function(err, user) {
    if (err) {
      return res.status(500).json({ msg: err.message })
    }
    if (!user) {
      return res.status(404).json({ msg: 'User not recognized' })
    }
    //compare login password with stored password
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch && isMatch == true) {
        var role = ''
        var isAdmin = false
        if (user.isAdmin && user.isAdmin == true) {
          role = 'Admin'
          isAdmin = true
        } else {
          role = 'User'
        }
        var expireTime = 60 * 60
        user.jwt = jwt.sign(
          {
            id: user.id,
            userName: user.userName,
            role: role,
            isAdmin: isAdmin
          },
          config.JWT_SECRET,
          { expiresIn: expireTime }
        )
         res.cookie('access_token', user.jwt, {
           expires: new Date(Date.now() + 90000000)
         })
        let userPresentable = user.presentable()
        userPresentable.access_token = user.jwt
        res.status(202).json({ msg: 'Logged in as: ' + user.userName, user: userPresentable })
      } else {
        res.status(401).json({ msg: 'no password match' })
      }
    })
  })
})

router.get('/logout', function(req, res) {
  let test = jwt.sign({}, 'secret')
  res.cookie('access_token', test, {
    expires: new Date(Date.now() - 10000),
    httpOnly: true
  })
  res.json({ msg: 'logged out' })
})

router.get('/relogin', async function(req, res) {
  let access_token_header = req.headers['access_token']
  //console.log(access_token_header)
  if (access_token_header !== undefined) {
    try {
      let user = jwt.verify(access_token_header, jwtSecret.JWT_SECRET)
      let userFromDb = await User.findOne({ userName: user.userName })
      let userPresentable = userFromDb.presentable()
      userPresentable.access_token = access_token_header
      console.log('RELOGIN:' + userPresentable.userName)
      res.json({ msg: 'Relogged in as: ' + userPresentable.userName, user: userPresentable })
      return
    } catch (error) {
      console.log('RELOGIN No HEADER access_token found ' + error.message)
    }
  }

  return res.status(404).json({ msg: 'User not recognized' })
})

module.exports = router
