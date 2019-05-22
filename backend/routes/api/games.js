const express = require('express')
const router = express.Router()
const schema = require('../../api/game/schema')
const mongoose = require('mongoose')
const GameSchema = new mongoose.Schema(schema)
const Game = mongoose.model('Game', GameSchema)
const config = require('../../config.js')

const uri = config.URL

mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

router.get('/', function(req, res, next) {
  Game.find(function(err, result) {
    if (err) {
      res.json({ msg: err.message })
    } else {
      res.json(result)
    }
  })
})

router.get('/:id', function(req, res, next) {
  Game.findById(req.params.id, (err, game) => {
    if (err) {
      res.status(400).json({ msg: 'No game found' })
    } else {
      res.json(game)
    }
  })
})

router.post('/', function(req, res, next) {
  var sanitized = {
    questionID: req.body.questionID,
    userID: req.body.userID,
    userScore: req.body.userScore,
    botIDs: req.body.botIDs,
    moveHistory: req.body.moveHistory
  }
  const newGame = new Game(sanitized)

  newGame.save(function(err) {
    if (err) {
      var errMessage = ''
      for (var errName in err.errors) {
        errMessage += err.errors[errName].message
      }
      res.status(400).json({ msg: errMessage })
    } else {
      res.status(201).json(newGame)
    }
  })
})

module.exports = router
