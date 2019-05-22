module.exports = {
  questionID: { type: String, required: true },
  userID: { type: String, required: false },
  userScore: { type: Number, required: false },
  botIDs: { type: Array, required: false },
  moveHistory: { type: Array, required: true }
}
