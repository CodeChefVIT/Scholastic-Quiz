const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routers/questions') 
const cors = require('cors') 

require('dotenv').config()

app.use(cors()) 
app.use(express.json()) 
app.use(routes) 

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))

app.listen(process.env.PORT, () => {
    console.log("The API is running...")
})