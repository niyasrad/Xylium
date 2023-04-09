const cors = require('cors')
const corsOptions = require('./cors')
const express = require('express')

const combineMiddleware = (app) => {
    app.use(cors(corsOptions))
    app.use(express.json())
} 

module.exports = combineMiddleware