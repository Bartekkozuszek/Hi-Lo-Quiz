var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

const whitelist = ['http://localhost:8080', 'http://localhost:8081']
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

var app = express()

app.use(logger('combined'))
app.use(
  cors({
    origin: corsOptions.origin,
    exposedHeaders: ['access_token'],
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//make all req query params lowercase
app.use(function(req, res, next) {
  console.log(
    '' +
      req.path +
      ' ' +
      req.headers.origin +
      ', access_token header: ' +
      (req.headers['access_token'] !== undefined) +
      ', cookie: ' +
      (req.cookies.access_token !== undefined)
  )

  for (var key in req.query) {
    req.query[key.toLowerCase()] = req.query[key]
  }
  next()
})

//check if user is already logged in
app.use('/login', require('./auth/loginAuth'))

app.use('/api', require('./auth/auth'))

//app.use('/', require('./auth/user'))
app.use('/', require('./routes/login'))

app.use('/api/v1/questions', require('./routes/api/questions'))

app.use('/api/v1/users', require('./routes/api/users'))

app.use('/api/v1/bots', require('./routes/api/bots'))

app.use('/api/v1/games', require('./routes/api/games'))

module.exports = app
