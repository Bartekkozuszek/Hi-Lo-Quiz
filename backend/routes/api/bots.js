const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const helpers = require('../../api/bot/helpers')
const config = require('../../config.js')
const schema = require('../../api/bot/schema')
const BotSchema = new mongoose.Schema(schema)
const Bot = mongoose.model('Bot', BotSchema)
const uri = config.URL

mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

router.get('/', function(req, res, next) {
  let sort = helpers.parseSort(req.query.sort)

  Bot.find(function(err, result) {
    if (err) {
      res.json({ msg: err.message })
    }
  }).sort([[sort, -1]])
    .exec(function(err, docs) {
      if (err) {
        res.json({ msg: err.message })
      } else {
        res.json(docs)
      }
    })
})

router.get('/:id', function(req, res, next) {
  Bot.findById(req.params.id, (err, bot) => {
    if (err) {
      res.status(400).json({ msg: 'No bot found' })
    } else {
      res.json(bot)
    }
  })
})

router.delete('/:id', async function(req, res, next) {
  try {
    removedBot = await Bot.findByIdAndRemove(req.params.id)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
  if (removedBot === null) {
    res.status(404).end()
  } else {
    res.status(200).json(removedBot)
  }
})

module.exports = router
