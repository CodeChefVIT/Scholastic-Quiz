const express = require('express')
const router = express.Router()
const Question = require("../models/questions")
const verify = require('./middleware')
const User = require('../models/User')
var mongoose=require('mongoose')
var MongoClient = require('mongodb').MongoClient;
const adminAccess = require('./adminMiddleware')

// get all quiz questions
router.get('/questions',verify, async (req, res) => {
    try {
        const questions = await Question.find()
        console.log(req.user)
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get one quiz question
router.get('/questions/:id',verify, async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.findOne({_id})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create one quiz question
router.post('/questions',verify,adminAccess, async (req, res) => {
    try {
        const { description } = req.body
        const { alternatives } = req.body
        const {correct_answer} = req.body

        const question = await Question.create({
            description,
            alternatives,
            correct_answer
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// update one quiz question
router.put('/questions/:id',verify,adminAccess, async (req, res) => {
    try {
        const _id = req.params.id 
        const { description, alternatives,correct_answer } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                alternatives,
                correct_answer
            })    
            return res.status(201).json(question)
        }else{
            question.description = description
            question.alternatives = alternatives
            question.correct_answer = correct_answer
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/questions/:id',verify,adminAccess, async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.put('/answer',verify,async (req,res)=>{
    
        const gg = req.body
        var user = req.user.user
        console.log(user)
        for(i=0;i<gg.questions.length;i++){
            var question = await  Question.findOne({_id:gg.questions[i].q_id})
            if(question.correct_answer==gg.questions[i].option){
                user.score+=1
            }
        }
        console.log(user.score)
        User.updateOne({_id:user._id},{$set:{score:user.score}}).then(result=>{
            res.status(200).send(user)
        }).catch(err=>{
            res.sendStatus(500)
        })   
    //     console.log(user.score)
    //     let question  = await Question.findOne({_id})
        
    // for(i=0;i<15;i++){
    //     if(question.correct_answer==option){
    //         user.score +=1
    //     }
    // }
    //     console.log(user.score)
         
})

// this one is just a test
router.get('/profile/me',verify,async (req, res) => {
    const user = req.user.user
    try{
        res.send(user)
    }catch(err){
        res.sendStatus(500)
    }
})




module.exports = router