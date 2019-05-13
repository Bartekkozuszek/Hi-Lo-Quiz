module.exports.editQuestion = function(req) {
  let question = {}
  if (req.body.question) {
    question.question = req.body.question
  }
  if (req.body.answer) {
    question.answer = req.body.answer
  }
  if (req.body.approved != undefined) {
    question.approved = req.body.approved
  }
  if (req.body.userSubmitted != undefined) {
    question.userSubmitted = req.body.userSubmitted
  }
  if (req.body.author) {
    question.author = req.body.author
  }
  if (req.body.category) {
    question.category = req.body.category
  }
  if (req.body.imageUrl) {
    question.imageUrl = req.body.imageUrl
  }
  if (req.body.low) {
    question.low = req.body.low
  }
  if (req.body.high) {
    question.high = req.body.high
  }

  question.reviewedBy = req.user && req.user.isAdmin ? req.user.name : ''
  return question
}
