const express = require("express")
const router = express.Router();

const {getAllNotes, getNoteById, createNote, updateNote, deleteNote} = require("../controller/noteController")


router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

module.exports = router