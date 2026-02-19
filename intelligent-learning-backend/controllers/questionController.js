const Question = require("../models/Question");
const Topic = require("../models/Topic");
const mongoose = require("mongoose");

// Admin creates a question
exports.createQuestion = async (req, res) => {
  try {
    const { topic, questionText, options, correctAnswer, explanation } = req.body;

    // convert string → ObjectId
    if (!mongoose.Types.ObjectId.isValid(topic)) {
      return res.status(400).json({ message: "Invalid Topic ID format" });
    }

    const topicObjectId = new mongoose.Types.ObjectId(topic);

    // check topic exists
    const topicExists = await Topic.findById(topicObjectId);
    if (!topicExists) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // create question
    const question = await Question.create({
      topic: topicObjectId,
      questionText,
      options,
      correctAnswer,
      explanation,
      createdBy: req.user._id,
    });

    res.status(201).json(question);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get questions by topic (for students)
exports.getQuestionsByTopic = async (req, res) => {
  try {
    const questions = await Question.find({
      topic: req.params.topicId,
    }).select("-correctAnswer");

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

