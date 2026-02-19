const express = require("express");
const router = express.Router();

const { submitAttempt } = require("../controllers/attemptController");
const { protect } = require("../middleware/authMiddleware");

// student submits answer
router.post("/", protect, submitAttempt);

module.exports = router;
