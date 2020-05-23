const express = require('express')
const router = express.Router()
const Question = require("../models/questions")
const verify = require('./middleware')
var mongoose=require('mongoose')
var MongoClient = require('mongodb').MongoClient;
DATABASE_URL= "mongodb+srv://jugalbhatt123:ccProject@cluster0-yb5lv.mongodb.net/Main?retryWrites=true&w=majority"

// get all quiz questions
router.get('/questions',verify, async (req, res) => {
    try {
        const questions = await Question.find()
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
router.post('/questions',verify, async (req, res) => {
    try {
        const { description } = req.body
        const { alternatives } = req.body

        const question = await Question.create({
            description,
            alternatives
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// update one quiz question
router.put('/questions/:id',verify, async (req, res) => {
    try {
        const _id = req.params.id 
        const { description, alternatives } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                alternatives
            })    
            return res.status(201).json(question)
        }else{
            question.description = description
            question.alternatives = alternatives
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/questions/:id',verify, async (req, res) => {
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

router.post('/answer/:id/:option',async (req,res)=>{
    const user=req.user
    option=req.params.option
    MongoClient.connect(DATABASE_URL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("main");
        var query = { _id: req.params.id,       //id for question
                        //id for the option
                    };
        dbo.collection("questions").find(query).toArray(function(err, result) {
          if (err) throw err;
          else{
           if(result.correct_answer===option){
               user.score=user.score+1;
           }
            res.send(result);
        }
          console.log(user.score);
          res.send(result);
          db.close();
        });
      });

    console.log("get");
})

// this one is just a test
router.get('/', (req, res) => {
    res.send('H3ll0 W0RlD')
})


module.exports = router