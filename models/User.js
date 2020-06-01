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
    score:{
        type:Number,
        default:0
    },
    scoreCC:{
        type:Number,
        default:0
    },
    testStarted:{
        type : Boolean,
        default :false
    },
    isAdmin:{
        type:Boolean,
        default :false
    },
    passResetKey:String,
    passKeyExpires:Number,
    createdAt: {
      type: Date,
      required: false
    },
    updatedAt: {
      type: Number,
      required: false
    },
    testGiven:{
        type:Boolean,
        default:false
    },
    responses:[

    ],
    responsesCC:[

    ],
    timeLeft:{
        type: Number,
        default:20
    },
    timeLeftCC:{
        type: Number,
        default:20
    },
    noOfRefresh:{
        type:Number,
        default:0
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    ccStarted:{
        type:Boolean,
        default:false
    },
    registrationNumber:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('User',userSchema)