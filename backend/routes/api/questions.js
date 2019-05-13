var express = require('express')
var router = express.Router()

const uri = 'mongodb://localhost:27017/test_lobsters_questions'
const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: Number, required: true },
  approved: { type: Boolean, required: false },
  userSubmitted: { type: Boolean, required: false },
  author: { type: String, required: false },
  category: { type: String, required: false },
  reviewedBy: { type: String, required: false },
  imageUrl: { type: String, required: false },
  low: { type: Number, required: false },
  high: { type: Number, required: false }
})

const Question = mongoose.model('Question', QuestionSchema)

mongoose.connect(uri, { useNewUrlParser: true })

router.get('/category/', function(req, res, next) {
  res.json({ msg: 'Must select a category' })
})

router.get('/category/:category', function(req, res, next) {
  Question.find({ category: req.params.category }).then((question, err) => {
    if (err) {
      res.status(400).json({ msg: 'Must select a category' })
    } else {
      res.json(question)
    }
  })
})

router.get('/author/', function(req, res, next) {
  res.json({ msg: 'Must select a author' })
})

router.get('/author/:author', function(req, res, next) {
  Question.find({ author: req.params.author }).then((question, err) => {
    if (err) {
      res.status(400).json({ msg: 'Must select a author' })
    } else {
      res.json(question)
    }
  })
})

router.get('/', function(req, res, next) {
  // TODO TEMP TEMP
  if (req.query.amount) {
    console.log(req.query.amount)
  }
  Question.find().then(questions => res.json(questions))
})

router.get('/:id', function(req, res, next) {
  Question.findById(req.params.id).then((question, err) => {
    if (err) {
      res.status(400).json({ msg: 'hit' })
    } else {
      res.json(question)
    }
  })
})

router.post('/', function(req, res, next) {
  const newQuestion = new Question(req.body)

  newQuestion.save().then(( err) => {
    if (err) {
      console.log(err)
      res.status(400).json({ msg: 'Error' })
    } else {
      res.json(result)
    }
  })
})

module.exports = router
