const router = require('express').Router();
const User = require('../models/User')
const Joi = require('@hapi/joi')
const bcrypt =require('bcryptjs')
const JWT = require('jsonwebtoken')

// const schema = Joi.object({
//     name:Joi.string().min(6).required(),
//     email:Joi.string().min(6).required().email(),
//     password:Joi.string().min(6).required(),
// })




router.post('/register',async (req,res)=>{

    var admin = false
    //check for  existing user
    const emailExist =await User.findOne({email:req.query.email})
    if(emailExist){
        return res.status(400).send('Email Exists')
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.query.password,salt)
    
    //Check Admin Code
    if(req.query.adminCode===process.env.ADMIN_CODE){
        admin =true 
    }

    const user = new User({
        name : req.query.name,
        email : req.query.email,
        password: hashedPassword,
        isAdmin : admin
    })
    try{
        const savedUser = await user.save()
        res.send({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin})
    }catch(err){
        res.status(400).send(err)
    }
})



router.post('/login',async (req,res,next)=>{
    
    //check if user exists
    const user = await User.findOne({email:req.query.email})
    if(!user) return res.status(404).send('Email or password is incorrect')

    //check password
    const validPass = await bcrypt.compare(req.query.password,user.password)
    if(!validPass) return res.status(400).send('invalid pass')
   
    //Create and assign JWT

    const token = JWT.sign({user},process.env.JWT_TOKEN)
    res.header('auth-token',token)

    res.send({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin,authToken:token})

})



module.exports = router