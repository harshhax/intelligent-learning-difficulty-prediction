const express = require("express");
const router = express.Router();

const { createSubject } = require("../controllers/subjectController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Admin creates subject
router.post("/", protect, authorize("admin"), createSubject);

module.exports = router;
