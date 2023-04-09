require('dotenv').config()

const mongoose  = require('mongoose')
const express = require('express')

const app = express()

const combineMiddleware = require('./src/utils')
const combineRoutes = require('./src/routes')

combineMiddleware(app)
combineRoutes(app)

app.get('/server', (req, res) => {
    return res.status(200).json({
        message: "Up and running!"
    })
})

const PORT = process.env.port || 8080

app.listen(PORT, async () => {
    console.log("SERVER LISTENING ON PORT " + PORT + "....")
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to Database!")
    })
    .catch((err) => {
        console.log("Error while connecting to Database!" + err.message)
    })
})

