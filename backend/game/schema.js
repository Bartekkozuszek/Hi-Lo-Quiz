module.exports = {
  questionID: { type: String, required: true },
  userID: { type: String, required: false },
  botIDs: { type: Array, required: false },
  moveHistory: { type: Array, required: true }
}
