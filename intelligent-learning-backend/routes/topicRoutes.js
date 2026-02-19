const express = require("express");
const router = express.Router();

const { createTopic } = require("../controllers/topicController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Admin creates topic
router.post("/", protect, authorize("admin"), createTopic);

module.exports = router;
