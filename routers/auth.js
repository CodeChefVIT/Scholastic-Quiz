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
    
    // const validation = schema.validate(req.body,schema)

    // res.send(validation)
    

    //check for  existing user
    const emailExist =await User.findOne({email:req.body.email})
    if(emailExist){
        return res.status(400).send('Email Exists')
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password: hashedPassword
    })
    try{
        const savedUser = await user.save()
        res.send({_id:user._id,name:user.name,email:user.email})
    }catch(err){
        res.sendStatus(400)
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
    res.header('auth-token',token).send(token)

    res.send({_id:user._id,name:user.name,email:user.email})

})

module.exports = router