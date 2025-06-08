const { timeStamp } = require("console")
const mongoose = require("mongoose")

// 1st step- create a schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        reqired: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true}) // createdAt, time & date

// 2nd step- create a model based off of that schema
module.exports = mongoose.model("Note", noteSchema)