const express = require("express");
const router = express.Router();

const { createCourse } = require("../controllers/courseController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Admin creates course
router.post("/", protect, authorize("admin"), createCourse);

module.exports = router;
    