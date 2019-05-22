module.exports = {
  botID: { type: Number, required: true },
  wins: { type: Number, required: false, default: 0 },
  losses: { type: Number, required: true, default: 0 }
}
