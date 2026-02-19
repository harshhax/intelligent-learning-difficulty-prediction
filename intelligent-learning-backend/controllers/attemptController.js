const Attempt = require("../models/Attempt");
const Question = require("../models/Question");

// Student submits an answer
exports.submitAttempt = async (req, res) => {
  try {
    const { questionId, selectedOption, timeTaken } = req.body;

    // validation
    if (!questionId || selectedOption === undefined) {
      return res.status(400).json({
        message: "Question and selected option are required",
      });
    }

    // find question
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // check correctness
    const isCorrect = selectedOption === question.correctAnswer;

    // count previous attempts (for repeated attempts metric)
    const previousAttempts = await Attempt.countDocuments({
      student: req.user._id,
      question: questionId,
    });

    // create attempt record
    const attempt = await Attempt.create({
      student: req.user._id,
      question: questionId,
      topic: question.topic,
      selectedOption,
      isCorrect,
      timeTaken,
      attemptNumber: previousAttempts + 1,
    });

    // response to frontend
    res.status(201).json({
      correct: isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      attemptNumber: attempt.attemptNumber,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
