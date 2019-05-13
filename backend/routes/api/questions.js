// Mongoose validation https://stackoverflow.com/questions/15012250/handling-mongoose-validation-errors-where-and-how

const uri = 'mongodb://localhost:27017/test_lobsters_questions'
const express = require('express')
const router = express.Router()
const schema = require('../../question/schema')
const helpers = require('../../question/helpers')
const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema(schema)
const Question = mongoose.model('Question', QuestionSchema)

mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
)

router.use(function(req, res, next) {
  console.log(req.user)
  // TODO temp for now
  // req.user = {
  //   isAdmin: false,
  //   name: 'TEMPUser'
  // }
  next()
})

router.get('/', function(req, res, next) {
  var approvedQuery = req.user.isAdmin ? {} : { approved: true }
  Question.find(approvedQuery).then(questions => res.json(questions))
})

router.get('/:id', function(req, res, next) {
  Question.findById(req.params.id, (err, question) => {
    if (err) {
      res.status(400).json({ msg: 'No question found' })
    } else {
      res.json(question)
    }
  })
})

router.post('/', function(req, res, next) {
  var sanitized = {
    question: req.body.question,
    answer: req.body.answer,
    approved: req.user && req.user.isAdmin ? true : false,
    userSubmitted: req.user && req.user.isAdmin ? false : true,
    author: req.user ? req.user.name : '',
    category: req.body.category,
    reviewedBy: req.user && req.user.isAdmin ? req.user.name : '',
    imageUrl: req.body.imageUrl,
    low: req.body.low,
    high: req.body.high
  }
  const newQuestion = new Question(sanitized)

  newQuestion.save(function(err) {
    if (err) {
      var errMessage = ''
      for (var errName in err.errors) {
        errMessage += err.errors[errName].message
      }
      res.status(400).json({ msg: errMessage })
    } else {
      res.json(newQuestion)
    }
  })
})

router.put('/:id', function(req, res, next) {
  // TODO temp for now, all edits from this temp admin
  req.user = {
    isAdmin: true,
    name: 'TEMPAdminName'
  }
  if (req.user && req.user.isAdmin) {
    var sanitized = helpers.editQuestion(req)
    Question.findByIdAndUpdate(
      req.params.id,
      { $set: sanitized },
      { new: true, runValidators: true, useFindAndModify: false }
    )
      .then(result => res.json(result))
      .catch(err =>
        res.status(400).json({ msg: `Didn't edit. ${err.message}` })
      )
  } else {
    res.status(401).json({ msg: 'Must be admin to edit' })
  }
})

module.exports = router
