const express = require("express");
const router = express.Router();

const { getWeakTopics } = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

// student views weak topics
router.get("/weak-topics", protect, getWeakTopics);

module.exports = router;
