const express = require('express')
const dotenv = require('dotenv').config({path:'./config/config.env'})

const bodyParser = require('body-parser')

const connectDB = require('./config/db')





const auth = require('./routes/auth')
const shop = require('./routes/shop') 
const admin = require('./routes/admin') 
const payment = require('./routes/payment') 

connectDB()

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())






app.use('/api',auth)
app.use('/api',shop)
app.use('/api',payment)
app.use('/api',admin)

const PORT = process.env.PORT || 5000




app.listen(
    PORT,
    console.log(`Server running   on port ${PORT}` )
    )
