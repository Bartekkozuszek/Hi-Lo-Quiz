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
  console.log(req.query.amount)

  Question.find().then(questions => res.json(questions))
})

router.get('/:id', function(req, res, next) {
  
    Question.findById(req.params.id).then((question,err) => {
      if (err) {
        res.status(400).json({ msg: 'hit' })
      }else{
        res.json(question)
      }
    })
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
