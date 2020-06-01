const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Questionrouter = require('./routers/questions') 
const QuestionCCrouter = require('./routers/questionsCC')
const Authrouter =require('./routers/auth')
const cors = require('cors') 
const rateLimit = require('express-rate-limit')
require('dotenv').config()

 
// Create the server


app.enable('trust proxy')

var limiter = new rateLimit({
    windowMs:15*60*1000,
    max:100,
    delayMs:0,
    message:"Too many requests created from this IP, please try again after an hour"
})

app.use(limiter)
app.use(cors()) 
app.use(express.json()) 
app.use(Questionrouter) 
app.use(QuestionCCrouter)
app.use('/api/user',Authrouter)

//allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))



app.listen(process.env.PORT, () => {
    console.log("The API is running...")
})
