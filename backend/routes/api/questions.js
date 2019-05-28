// Mongoose validation https://stackoverflow.com/questions/15012250/handling-mongoose-validation-errors-where-and-how

const express = require('express')
const router = express.Router()
const schema = require('../../api/question/schema')
const helpers = require('../../api/question/helpers')
const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema(schema)
const Question = mongoose.model('Question', QuestionSchema)
const config = require('../../config.js')

const uri = config.URL

mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

router.use(function(req, res, next) {
  //Can use this to override temporary when testing
  //req.user = {
  // name: 'user1',
  // isAdmin: true
  //}

  //console.log(req.user)
  next()
})

router.get('/categories', function(req, res, next) {
  Question.distinct('category', function(err) {
    if (err) {
      res.json({ msg: err.message })
    }
  }).then(result => {
    res.json(result)
  })
})

router.get('/authors', function(req, res, next) {
  Question.distinct('author', function(err) {
    if (err) {
      res.json({ msg: err.message })
    }
  }).then(result => {
    res.json(result)
  })
})

router.get('/', async function(req, res, next) {
  // make req params into query objects

  let category = req.query.category ? { category: { $eq: req.query.category } } : {}
  let author = req.query.author ? { author: { $eq: req.query.author } } : {}
  var approved =
    req.user.isAdmin && req.query.approved ? { approved: req.query.approved === 'true' } : { approved: true }
  let userSubmitted = req.query.userSubmitted ? { userSubmitted: { $eq: req.query.userSubmitted === 'true' } } : {} // convert string to boolean
  let reviewedBy = req.query.reviewedBy ? { reviewedBy: { $eq: req.query.reviewedBy } } : {}
  try {
    amount = req.query.amount ? parseInt(req.query.amount) : await Question.countDocuments()
  } catch (e) {
    res.json({ msg: e.message })
  }

  let query = [
    {
      $match: {
        $and: [
          // match any query objects included in this array
          author,
          category,
          approved,
          userSubmitted,
          reviewedBy
        ]
      }
    },
    { $sample: { size: amount } } // randomize and get correct amount of Questions
  ]
  Question.aggregate(query, function(err) {
    if (err) {
      res.json({ msg: err.message })
    }
  }).then(result => res.json(result))
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
    userSubmitted: req.user && req.user.isAdmin != undefined && req.user.isAdmin ? false : true,
    submitterUserName: req.user ? req.user.userName : '',
    author: req.body.author ? req.body.author : '',
    category: req.body.category,
    reviewedBy: req.user && req.user.isAdmin ? req.user.userName : '',
    imageUrl: req.body.imageUrl,
    learnMore: req.body.learnMore,
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
      res.status(201).json(newQuestion)
    }
  })
})

router.put('/:id', function(req, res, next) {
  if (req.user && req.user.isAdmin) {
    var sanitized = helpers.editQuestion(req)
    Question.findByIdAndUpdate(
      req.params.id,
      { $set: sanitized },
      { new: true, runValidators: true, useFindAndModify: false }
    )
      .then(result => res.json(result))
      .catch(err => res.status(400).json({ msg: `Didn't edit. ${err.message}` }))
  } else {
    res.status(401).json({ msg: 'Must be admin to edit questions' })
  }
})

router.delete('/:id', async function(req, res, next) {
  try {
    removedQuestion = await Question.findByIdAndRemove(req.params.id)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
  if (removedQuestion === null) {
    res.status(404).end()
  } else {
    res.status(200).json(removedQuestion)
  }
})

module.exports = router
