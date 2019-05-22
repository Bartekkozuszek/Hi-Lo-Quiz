const mongoose = require('mongoose')
const s = require('./schema')
const Schema = mongoose.Schema
const BotSchema = new Schema(s)

const Bot = mongoose.model('Bot', BotSchema)

module.exports = Bot
