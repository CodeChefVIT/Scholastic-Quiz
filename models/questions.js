const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    description: String,
    alternatives: [
        {
            text: {
                type: String,
                required: true
               }       }
    ],
    correct_answer:{
        type : String,
    
    }
})

module.exports = mongoose.model('question', questionSchema)