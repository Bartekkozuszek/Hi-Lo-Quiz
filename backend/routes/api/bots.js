const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const helpers = require('../../api/bot/helpers')
const config = require('../../config.js')
const Bot = require('../../api/bot/bot')
const uri = config.URL

mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

router.get('/', async function(req, res, next) {
  let sort = helpers.parseSort(req.query.sort)
  const amount = parseInt(req.query.amount)

  try {
    const bots = await Bot.find()
      .sort([[sort, -1]])
      .limit(amount)
    res.json(bots)
  } catch (error) {
    res.json({ msg: error.message })
  }
})

//get bot based on mongodb _id
router.get('/:id', async function(req, res, next) {
  try {
    const bot = await Bot.findById(req.params.id)
    res.json(bot)
  } catch (error) {
    res.status(400).json({ msg: 'No bot found' })
  }
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
