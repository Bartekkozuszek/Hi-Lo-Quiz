var jwt = require('jsonwebtoken')
var config = require('../jwt.js')
var User = require('../user/user')

module.exports = async function(req, res, next) {
  var cookie = req.cookies.access_token
  console.log(cookie)
  if (cookie === undefined) {
    console.log('No cookie access_token found')
    next()
  } else {
    console.log('access_token found')
    user = jwt.verify(cookie, config.JWT_SECRET)
    User.findById(user.id, function (err, result){
        if(err){
            res.json({msg: err.message })
        }
        res.json({ msg: 'already logged in as: ' + result.userName + ' (' + user.name + ')' })
    })
    return
  }
}
