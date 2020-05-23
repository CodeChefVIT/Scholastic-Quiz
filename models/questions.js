const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
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
    }
    
})

module.exports = mongoose.model('question', questionSchema)