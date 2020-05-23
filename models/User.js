const mongoose =require('mongoose')


const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:1025
    },
    date:{
        type:Date,
        default: Date.now
    },
    isAdmin:{
        type:Boolean,
        default :false
    }
})


module.exports = mongoose.model('User',userSchema)