const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const notes = require("../controllers/notes");

router.post("/add", addNotes);
router.get("/get", getNotes);
router.delete("/delete", deleteNotes);

async function addNotes(req, res) {
  try {
    let result = await notes.addNotes(req.body);
    res.status(201).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

async function getNotes(req, res) {
  try {
    let result = await notes.getNotes(req.query);
    res.json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

async function deleteNotes(req, res) {
  try {
    let result = await notes.deleteNotes(req.body);
    res.status(201).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

module.exports = router;
