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

router.get('/played', async function(req, res, next) {
  try {
    const played = await Game.find().countDocuments()
    res.json({ played: played })
  } catch (error) {
    res.json({ msg: error.message })
  }
})

router.get('/', async function(req, res, next) {
  try {
    const games = await Game.find()
    res.json(games)
  } catch (error) {
    res.json({ msg: error.message })
  }
})

router.get('/:id', async function(req, res, next) {
  try {
    const game = await Game.findById(req.params.id)
    res.json(game)
  } catch (error) {
    res.status(400).json({ msg: 'No game found' })
  }
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
    await newGame.save()
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
  console.log('userID ' + userID)
  console.log('req.user.id ' + req.user.id)
  //if (req.user.id === userID) {
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
  //}

  let responseJson = {}
  responseJson.updatedUser = updatedUser ? updatedUser.presentable() : {}
  responseJson.bots = bots ? bots : []

  res.status(200).json(responseJson)
})

module.exports = router
