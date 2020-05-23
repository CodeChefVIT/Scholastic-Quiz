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
<<<<<<< HEAD
    score:{
        type:Number,
        default:0
=======
    isAdmin:{
        type:Boolean,
        default :false
>>>>>>> e8e2e850cd60eec719073492e9b75ec4c2d38c94
    }
})


module.exports = mongoose.model('User',userSchema)