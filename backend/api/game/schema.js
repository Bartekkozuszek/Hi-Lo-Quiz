module.exports = {
  questionID: { type: String, required: true },
  userID: { type: String, required: false },
  score: { type: Number, required: false },
  botIDs: { type: Array, required: false },
  moves: { type: Array, required: true }
}
