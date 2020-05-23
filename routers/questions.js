const express = require('express')
const router = express.Router()
const Question = require("../models/questions")
const verify = require('./middleware')
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

router.post('/answer/:id/:option',verify,async (req,res)=>{
    const user=req.user
    var option=req.params.option
    MongoClient.connect(process.env.DATABASE_URL, function(err, db) {
        var a="what is the result of 2+4";
        if (err) throw err;
        var dbo = db.db("main");

 var ObjectId = require('mongodb').ObjectId; 
 var id = req.params.id;       
 var o_id = new ObjectId(id);
 ///// this is a test 

 dbo.collection("questions").findOne({'description': a}, function(error,doc) {
 if (error) {
   callback(error);
 } else {
    console.log(doc)
 }
});





 /////
console.log(o_id)

         var query = { '_id': o_id   
                    };
        dbo.collection("questions").find(query).toArray(function(err, result) {
          if (err) throw err;
          else{
           if(result.correct_answer===option){
               user.user.score=user.user.score+1;
           }
            res.send(result);
        }
          console.log(user.user.score);
        console.log(result);
          db.close();
        });
      });

    // if(option === question.correct_answer){
    //     user.score +=1;
    //     console.log(user.score)
    // }
    // user.score = user.score

    // try{
    //     res.status(200).send(user.score)
    // }catch(err){
    //     res.status(400).send(err)
    // }
    
 
})

// this one is just a test
router.get('/', (req, res) => {
    res.send('H3ll0 W0RlD')
})




module.exports = router