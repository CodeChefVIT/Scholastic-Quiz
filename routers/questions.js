const express = require('express')
const router = express.Router()
const Question = require("../models/questions")
const verify = require('./middleware')
const User = require('../models/User')
var mongoose=require('mongoose')
var MongoClient = require('mongodb').MongoClient;
const adminAccess = require('./adminMiddleware')
const shortid=require('shortid')
const nodemailer=require('nodemailer')

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

router.post('/forgot', (req, res) => {
   // let {email} = req.body; // same as let email = req.body.email
    var email=req.query.email;
    User.findOne({email: email}, (err, userData) => {
      if (!err && userData!=null) {
        userData.passResetKey = shortid.generate();
        userData.passKeyExpires = new Date().getTime() + 20 * 60 * 1000 // pass reset key only valid for 20 minutes
        userData.save().then(x => {
            if (!err) {
              // configuring smtp transport machanism for password reset email
              console.log('its britteny bitch')
              console.log(userData)
              let transporter = nodemailer.createTransport({
                service: "gmail",
                port: 465,
                auth: {
                  user: '', // your gmail address
                  pass: '' // your gmail password
                }
              });
              let mailOptions = {
                subject: `NodeAuth | Password reset`,
                to: email,
                from: `NodeAuthTuts`,
                html: `
                  <h1>Hi,</h1>
                  <h2>This email contains a password reset key, which you will need to enter in order to reset the password, please do not share this key with anyone.</h2>
                  <h2><code contenteditable="false" style="font-weight:200;font-size:1.5rem;padding:5px 10px; background: #EEEEEE; border:0">${userData.passResetKey}</code></h2>
                  <h2>This password reset key is valid for the next 20 minutes</h2>
                  <p>Please ignore if you didn't try to reset your password on our platform</p>
                  `
              };
              try {
                transporter.sendMail(mailOptions, (error, response) => {
                  if (error) {
                    console.log("error:\n", error, "\n");
                    res.status(500).send("could not send reset code");
                  } else {
                    console.log("email sent:\n", response);
                    res.status(200).send("Reset Code sent");
                  }
                });
              } catch (error) {
                console.log(error);
                res.status(500).send("could not sent reset code");
              }
            }
          })
      } else {
        res.status(400).send('email is incorrect');
      }
    })
  });

  router.post('/resetpass', (req, res) => {
    let {resetKey, newPassword} = req.body
      User.find({passResetKey: resetKey}, (err, userData) => {
          if (!err) {
              let now = new Date().getTime();
              let keyExpiration = userDate.passKeyExpires;
              if (keyExpiration > now) {
          userData.password = bcrypt.hashSync(newPassword, 5);
                  userData.passResetKey = null; // remove passResetKey from user's records
                  userData.keyExpiration = null;
                  userData.save().then(err => { // save the new changes
                      if (!err) {
                          res.status(200).send('Password reset successful')
                      } else {
                          res.status(500).send('error resetting your password')
                      }
                  })
              } else {
                  res.status(400).send('Sorry, pass key has expired. Please initiate the request for a new one');
              }
          } else {
              res.status(400).send('invalid pass key!');
          }
      })
  })


  router.get('/checkAuth',verify,async (req,res)=>{
      const user  = await req.user.user
      try{
          res.send(user)

      }catch(err){
          res.status(400).send(err)
      }
  })
  





module.exports = router