const QuestionCC = require("../models/quectionCC")
const express = require('express')
const router = express.Router()
const Question = require("../models/questions")
const verify = require('./middleware')
const User = require('../models/User')
const adminAccess = require('./adminMiddleware')
const shortid=require('shortid')
const nodemailer=require('nodemailer')
const bcrypt=require('bcryptjs')
var mongoose=require('mongoose')

router.post('/questionsCC',verify,adminAccess, async (req, res) => {
    try {
        const { description } = req.body
        const { alternatives } = req.body
        const {correct_answer} = req.body
        const {questionType} = req.body

        const question = await QuestionCC.create({
            description,
            alternatives,
            correct_answer,
            questionType
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.get('/getCC',verify, async (req, res) => {
    // console.log(req.user.user.noOfRefresh)
    var mainQuestions= []
    for(i=0;i<10;i++){
        const question  = await QuestionCC.find({questionType:i})
        var random = Math.floor(Math.random()*question.length)
        console.log(random)
        mainQuestions.push(question[random])
    }
    
    



     try {
         
         //console.log(req.user.user.testGiven)
         const user = await User.findOne({_id:req.user.user._id})
        //  if(user.testGiven==true){
        //      res.status(201).send({message:"you've already given the test"})
        //  }
 
         
         //console.log(req.user.user)
         return res.status(200).send({mainQuestions})
     } catch (error) {
         return res.status(500).json({"error":error})
     }
 })
 router.put('/answerCC',verify,async (req,res)=>{
    
    const gg = req.body.questions
    const timeLeftCC = req.body.timeLeftCC
    var user = req.user.user
    
    for(i=0;i<gg.length;i++){
        var question = await  QuestionCC.findOne({_id:gg[i].q_id})
        const questionText = question.description
        const selectedOption = gg[i].option
        await User.updateOne({_id:user._id},{$push:{"responsesCC" : {questionText,selectedOption}}})
        if(question.correct_answer==selectedOption){
            
            user.scoreCC+=1
        }
    }
    
    
    await User.updateOne({_id:user._id},{$set:{scoreCC:user.scoreCC,testGiven:true,timeLeftCC}})
    try{
        const newUser = await User.findOne({_id:user._id})
        
        res.status(200).send(newUser)
    }catch(err){
        res.status(400).send(err)
    } 
})

module.exports = router
