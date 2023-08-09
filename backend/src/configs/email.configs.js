const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    },
    maxConnections: 5,
    rateLimit: 5000
})

module.exports = transporter