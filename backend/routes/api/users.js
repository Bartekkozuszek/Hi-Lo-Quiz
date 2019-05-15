/* eslint-disable prettier/prettier */
const uri = 'mongodb://localhost:27017/test_lobsters_questions'

const express = require('express')
const router = express.Router()
const schema = require('../../user/schema')
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(schema)
const User = mongoose.model('User', UserSchema)

mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

router.get('/', function(req, res, next){
    User.find(function(err, result){
        if(err){
            res.json({msg: err.message})
        }else{
            res.json(result)
        }
    })
})

router.post('/', function(req, res, next){

    let userProps = {
        name: req.body.name,
        displayName: req.body.displayName,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    }
    let newUser = new User(userProps)
    newUser.save(function(err){
        if(err){
            res.status(400).json({msg: err.message})
        }else{
            res.status(201).json(newUser)
        }
    })
})

router.delete('/:id', async function(req, res, next){
    try{ 
        removedUser = await User.findByIdAndRemove(req.params.id)
      }catch(e){
        res.status(400).json({msg: e.message})
      }
      if(removedUser === null){
        res.status(404).end()
      }else{
        res.status(200).json(removedUser)
      }
})

module.exports = router