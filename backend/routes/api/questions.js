var express = require('express')
var router = express.Router()

const uri = 'mongodb://localhost:27017/test_lobsters_questions'
const mongoose = require('mongoose')

var ValidationError = mongoose.Error.ValidationError
var ValidatorError = mongoose.Error.ValidatorError

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: [true, 'Question is required'] },
  answer: { type: Number, required: [true, 'Answer is required'] },
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

QuestionSchema.pre('save', function(next) {
  // if (/someregex/i.test(this.email)) {
  //   var error = new ValidationError(this);
  //   error.errors.email = new ValidatorError('email', 'Email is not valid', 'notvalid', this.email);
  //   return next(error);
  // }

  next()
})

var ValidationErrors = {
  REQUIRED: 'required',
  NOTVALID: 'notvalid'
}

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

module.exports = router
