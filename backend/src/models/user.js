const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    steamid: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('User', userSchema)