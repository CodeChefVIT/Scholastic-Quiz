const mongoose = require('mongoose')

const questionCCSchema = new mongoose.Schema({
    description:{
        type: String,
        required:true
    },
    alternatives: [
        {
            text: {
                type: String,
                required: true
               }       
        }
    ],
    correct_answer:{
        type: String,
        required:true
    },
    questionType:{
        type:number
    }
    
})

module.exports = mongoose.model('questionCC', questionCCSchema)