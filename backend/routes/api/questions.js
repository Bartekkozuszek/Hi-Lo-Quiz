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


router.get('/', async function(req, res, next) {
      
      // make req params into query objects
      let amount = req.query.amount ? parseInt(req.query.amount) : await Question.countDocuments()
      let category = req.query.category ? {category: {$eq: req.query.category}} : {}
      let author = req.query.author ? {author: {$eq: req.query.author}} : {}
      let approved = req.query.approved ? {approved: {$eq: (req.query.approved === "true")}} : {}// convert string to boolean
      let userSubmitted = req.query.userSubmitted ? {userSubmitted: {$eq: (req.query.userSubmitted === "true")}} : {}// convert string to boolean
      let reviewedBy = req.query.reviewedBy ? {reviewedBy: {$eq: req.query.reviewedBy}} : {}
      
      let query = [{
        $match: {$and: [// match any query objects included in this array
          author, 
          category,
          approved,
          userSubmitted,
          reviewedBy
          ]}},
          {$sample: {size: amount}}// randomize and get correct amount of Questions
          ]

      Question.aggregate(query)
        .then(result => res.json(result))
})

//--------------------------------------------------
// router.get('/', function(req, res, next) {
  
//   Question.countDocuments()
//     .then(count => {
//       let amount = req.query.amount ? parseInt(req.query.amount) : parseInt(count)
//       let category = req.query.category ? {category: {$eq: req.query.category}} : {}
//       let author = req.query.author ? {author: {$eq: req.query.author}} : {}
    
//       let query = [{
//         $match: {$and: [
//           author, 
//           category
//           ]}},
//           {$sample: {size: amount}}
//           ]

//       Question.aggregate(query)
//         .then(result => res.json(result))
//   })
// })


router.post('/', function(req, res, next) {
  const newQuestion = new Question(req.body)

  newQuestion.save().then(( err, result) => {
    if (err) {
      console.log(err)
      res.status(400).json({ msg: 'Error' })
    } else {
      res.json(result)  
    }
  })
})

module.exports = router
