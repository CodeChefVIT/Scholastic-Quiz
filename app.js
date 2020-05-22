const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Questionrouter = require('./routers/questions') 
const indexRouter=require('./routers/index')
const cors = require('cors') 
const passport =require('passport')
const User= require('./models/user')
var bodyParser=require('body-parser')

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const flash=('connect-flash')
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config()

app.use(cors()) 
app.use(express.json()) 
app.use(Questionrouter) 
app.use(indexRouter)
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))

app.listen(process.env.PORT, () => {
    console.log("The API is running...")
})