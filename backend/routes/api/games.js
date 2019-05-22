const express = require('express')
const router = express.Router()
const schema = require('../../api/game/schema')
const mongoose = require('mongoose')
const GameSchema = new mongoose.Schema(schema)
const Game = mongoose.model('Game', GameSchema)
const User = require('../../api/user/user')
const Bot = require('../../api/bot/bot')
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

router.post('/', async function(req, res, next) {
  var sanitized = {
    questionID: req.body.questionID,
    userID: req.body.userID,
    score: req.body.score,
    botIDs: req.body.botIDs,
    moves: req.body.moves
  }

  //save game history
  const newGame = new Game(sanitized)

  try {
    var addedGame = await newGame.save()
  } catch (e) {
    res.status(400).json({ msg: 'Error adding game history ' + e.message })
    return
  }

  let bots = []
  //add statistics for bots
  const winnerBotId = sanitized.moves[sanitized.moves.length - 1].id
  for (let i = 0; i < sanitized.botIDs.length; i++) {
    let element = sanitized.botIDs[i]
    let won = element === winnerBotId ? true : false
    let win = won ? 1 : 0
    let loss = won ? 0 : 1

    try {
      const updatedBot = await Bot.findOneAndUpdate(
        { botID: element },
        { $inc: { wins: win, losses: loss } },
        { upsert: true, new: true, runValidators: true, useFindAndModify: false }
      )
      bots.push(updatedBot)
    } catch (err) {
      res.status(400).json({ msg: 'Error updating statistics for bots ' + err.message })
      return
    }
  }

  //add statistics for user
  var userID = sanitized.userID
  if (req.user.id === userID) {
    var score = sanitized.score
    var lastMoveId = sanitized.moves[sanitized.moves.length - 1].id

    var won = lastMoveId === userID ? true : false
    var win = won ? 1 : 0
    var loss = won ? 0 : 1

    try {
      var updatedUser = await User.findByIdAndUpdate(
        userID,
        { $inc: { score: score, wins: win, losses: loss } },
        { new: true, runValidators: true, useFindAndModify: false }
      )
    } catch (err) {
      res.status(400).json({ msg: 'Error updating statistics for user ' + err.message })
      return
    }
  }

  let responseJson = {}
  responseJson.updatedUser = updatedUser ? updatedUser.presentable() : {}
  responseJson.bots = bots ? bots : []

  res.status(200).json(responseJson)
})

module.exports = router
