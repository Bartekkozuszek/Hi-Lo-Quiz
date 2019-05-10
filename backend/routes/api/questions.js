var express = require('express')
var router = express.Router()

const uri = 'mongodb://localhost:27017/test_lobsters_questions'
const mongoose = require('mongoose')
const Question = mongoose.model('Question', {
  usersubmitted: Boolean,
  author: String,
  category: String,
  reviewedby: String,
  question: String,
  imageurl: String,
  answer: Number,
  low: Number,
  high: Number
})

mongoose.connect(uri, { useNewUrlParser: true })

router.get('/', function(req, res, next) {
  Question.find().then(questions => res.json(questions))
})

router.post('/', function(req, res, next) {
  const newQuestion = new Question(req.body)
  newQuestion.save().then((result, err) => {
    if (err) {
      res.status(400).json({ msg: 'Error' })
    } else {
      res.json(result)
    }
  })
})

module.exports = router
