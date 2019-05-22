const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../../api/user/user')
const helpers = require('../../api/user/helpers')
const config = require('../../config.js')

const uri = config.URL

mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

router.get('/', async function(req, res, next) {
  const sort = helpers.parseSort(req.query.sort)
  const amount = parseInt(req.query.amount)

  try {
    var users = await User.find({}, { password: 0 })
      .sort([[sort, -1]])
      .limit(amount)
  } catch (error) {
    res.json({ msg: error.message })
    return
  }
  res.json(users)
})

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(400).json({ msg: 'No user found' })
    } else {
      res.json(user.presentable())
    }
  })
})

router.post('/', function(req, res, next) {
  let userProps = {
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    isAdmin: false
  }
  let newUser = new User(userProps)
  User.findOne({ userName: req.body.userName }, function(err, result) {
    if (err) {
      res.json({ msg: err.message })
    }
    if (!result) {
      newUser.save(function(err) {
        if (err) {
          res.status(400).json({ msg: err.message })
        } else {
          res.status(201).json(newUser.presentable())
        }
      })
    } else {
      res.status(406).json({ msg: 'Username already taken' })
    }
  })
})

router.put('/:id', async function(req, res, next) {
  if (req.user && req.user.isAdmin) {
    let userProps = {}

    if (req.body.firstName) {
      userProps.firstName = req.body.firstName
    }
    if (req.body.lastName) {
      userProps.lastName = req.body.lastName
    }
    if (req.body.isAdmin !== undefined) {
      userProps.isAdmin = req.body.isAdmin
    }

    try {
      var updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: userProps },
        { new: true, runValidators: true, useFindAndModify: false }
      )
    } catch (error) {
      res.status(400).json({ msg: error.message })
      return
    }
    res.status(200).json(updatedUser.presentable())
  } else {
    res.status(401).json({ msg: 'Must be admin to edit users (for now)' })
  }
})

router.delete('/:id', async function(req, res, next) {
  try {
    removedUser = await User.findByIdAndRemove(req.params.id)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
  if (removedUser === null) {
    res.status(404).end()
  } else {
    res.status(200).json(removedUser.presentable())
  }
})

module.exports = router
