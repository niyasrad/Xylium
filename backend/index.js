const express = require('express')
const app = express()

app.get('/server', (req, res) => {
    return res.status(200).json({
        message: "Up and running!"
    })
})

app.listen('8080', () => {
    console.log("SERVER LISTENING ON PORT 8080....")
})

