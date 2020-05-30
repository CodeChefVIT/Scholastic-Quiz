const QuestionCC = require("../models/questionCC")
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

router.get('/getCC',verify,isBlocked, async (req, res) => {
    // console.log(req.user.user.noOfRefresh)
     try {
         const questions = await Question.aggregate([{ $sample: { size: 25} },{$project:{correct_answer:0}}])
         //console.log(req.user.user.testGiven)
         const user = await User.findOne({_id:req.user.user._id})
         if(user.testGiven==true){
             res.status(201).send({message:"you've already given the test"})
         }
 
         await User.updateOne({_id:req.user.user._id},{$set:{testStarted:true}})
         //console.log(req.user.user)
         return res.status(200).send({questions})
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


