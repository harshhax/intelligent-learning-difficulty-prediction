const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createQuestion,
  getQuestionsByTopic,
} = require("../controllers/questionController");

// Get questions by topic (Student)
router.get("/topic/:topicId", protect, getQuestionsByTopic);

// Admin adds question
router.post("/", protect, authorize("admin"), createQuestion);

module.exports = router;
