// import { timestamp } from "console"
import mongoose from "mongoose"

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
const Note = mongoose.model("Note", noteSchema)

export default Note