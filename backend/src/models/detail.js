const mongoose = require("mongoose")

const detailSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    accountValue: {
        type: Number
    },
    lastRequested: {
        type: Date
    }
})

module.exports = mongoose.model('Detail', detailSchema)