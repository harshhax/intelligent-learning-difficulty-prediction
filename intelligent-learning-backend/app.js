const express = require("express");
const cors = require("cors");
const subjectRoutes = require("./routes/subjectRoutes");
const topicRoutes = require("./routes/topicRoutes");
const questionRoutes = require("./routes/questionRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const { protect, authorize } = require("./middleware/authMiddleware");

const app = express();

// 🔴 MIDDLEWARE FIRST (VERY IMPORTANT)
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Intelligent Learning Difficulty Prediction API Running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Protected test
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

// Admin test
app.get("/api/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin!",
  });
});

module.exports = app;
