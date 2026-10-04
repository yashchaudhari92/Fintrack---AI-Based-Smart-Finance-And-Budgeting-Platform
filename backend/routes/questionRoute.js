const express = require("express");
const router = express.Router();
const Question = require("../models/question");

router.post("/question", async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json({ message: "Question submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit question." });
  }
});

router.get("/question", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions." });
  }
});

module.exports = router;
